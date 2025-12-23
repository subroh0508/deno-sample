import { Hono } from "@hono/hono";
import { prisma } from "./lib/prisma.ts";

export const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello, World!");
});

// Create
app.post("/tasks", async (c) => {
  const { title } = await c.req.json();
  const task = await prisma.task.create({
    data: { title },
  });
  return c.json(task, 201);
});

// Read all
app.get("/tasks", async (c) => {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: "desc" },
  });
  return c.json(tasks);
});

// Read one
app.get("/tasks/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const task = await prisma.task.findUnique({
    where: { id },
  });
  if (!task) {
    return c.json({ error: "Task not found" }, 404);
  }
  return c.json(task);
});

// Update
app.patch("/tasks/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const body = await c.req.json();
  const task = await prisma.task.update({
    where: { id },
    data: body,
  });
  return c.json(task);
});

// Delete
app.delete("/tasks/:id", async (c) => {
  const id = Number(c.req.param("id"));
  await prisma.task.delete({
    where: { id },
  });
  return c.json({ message: "Task deleted" });
});
