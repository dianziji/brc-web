import { pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs";

const serverOnlyStubUrl = pathToFileURL(path.resolve(process.cwd(), "tests/stubs/server-only.mjs")).href;
const SRC_ROOT = path.resolve(process.cwd(), "src");

function resolveAliasToFileUrl(specifier) {
  if (!specifier.startsWith("@/")) return null;

  const relativePath = specifier.slice(2);
  const base = path.resolve(SRC_ROOT, relativePath);
  const candidates = [
    base,
    `${base}.ts`,
    `${base}.tsx`,
    `${base}.mjs`,
    `${base}.js`,
    path.join(base, "index.ts"),
    path.join(base, "index.tsx"),
    path.join(base, "index.mjs"),
    path.join(base, "index.js"),
  ];

  const match = candidates.find((candidate) => fs.existsSync(candidate));
  if (!match) return null;
  return pathToFileURL(match).href;
}

export async function resolve(specifier, context, defaultResolve) {
  if (specifier === "server-only") {
    return {
      url: serverOnlyStubUrl,
      shortCircuit: true,
    };
  }

  const aliasUrl = resolveAliasToFileUrl(specifier);
  if (aliasUrl) {
    return {
      url: aliasUrl,
      shortCircuit: true,
    };
  }

  return defaultResolve(specifier, context, defaultResolve);
}
