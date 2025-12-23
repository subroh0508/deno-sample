import { assertEquals } from "@std/assert";
import { app } from "./app.ts";

Deno.test("GET / returns Hello, World!", async () => {
  const res = await app.request("/");

  assertEquals(res.status, 200);
  assertEquals(await res.text(), "Hello, World!");
});
