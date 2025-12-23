import { Hono } from "@hono/hono";

export const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello, World!");
});
