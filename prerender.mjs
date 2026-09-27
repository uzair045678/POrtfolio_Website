import { readFile, writeFile } from "node:fs/promises";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { createServer } from "vite";

const server = await createServer({ server: { middlewareMode: true }, appType: "custom" });

try {
  const { default: App } = await server.ssrLoadModule("/src/App.jsx");
  const path = new URL("./dist/index.html", import.meta.url);
  const html = await readFile(path, "utf8");
  const marker = '<div id="root"></div>';
  if (!html.includes(marker)) throw new Error("Prerender target was not found in dist/index.html");
  await writeFile(path, html.replace(marker, `<div id="root">${renderToString(createElement(App))}</div>`));
} finally {
  await server.close();
}
