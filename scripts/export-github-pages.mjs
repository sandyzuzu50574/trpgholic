import { access, copyFile, cp, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const clientDir = path.join(projectRoot, "dist", "client");
const workerFile = path.join(projectRoot, "dist", "server", "index.js");
const outputDir = path.join(projectRoot, "pages-dist");

await access(clientDir);
await access(workerFile);

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });
await cp(clientDir, outputDir, { recursive: true });

const workerUrl = pathToFileURL(workerFile);
workerUrl.searchParams.set("static-export", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

const response = await worker.fetch(
  new Request("https://static-export.invalid/", {
    headers: { accept: "text/html" },
  }),
  {
    ASSETS: {
      fetch: async () => new Response("Not found", { status: 404 }),
    },
  },
  {
    waitUntil() {},
    passThroughOnException() {},
  },
);

if (!response.ok) {
  throw new Error(`Static render failed with HTTP ${response.status}`);
}

const contentType = response.headers.get("content-type") ?? "";
if (!contentType.startsWith("text/html")) {
  throw new Error(`Expected HTML, received ${contentType || "no content type"}`);
}

const html = (await response.text())
  .replaceAll("/assets/", "./assets/")
  .replace(/\b(src|href)="\/(?!\/)/g, '$1="./');

if (!html.includes("ZUZU") || !html.includes("TRPG-holic")) {
  throw new Error("Static render is missing the site identity.");
}

const rootRelativeSiteAssets = [
  '"/assets/',
  '"/zuzu-cheers',
  '"/witch-curse-cover',
];

if (rootRelativeSiteAssets.some((assetPath) => html.includes(assetPath))) {
  throw new Error("Static render still contains root-relative site assets.");
}

await writeFile(path.join(outputDir, "index.html"), html, "utf8");
await copyFile(
  path.join(outputDir, "index.html"),
  path.join(outputDir, "404.html"),
);
await writeFile(path.join(outputDir, ".nojekyll"), "", "utf8");

console.log(`GitHub Pages output created at ${outputDir}`);
