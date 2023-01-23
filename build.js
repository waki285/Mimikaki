// @ts-check
const { build } = require("esbuild");
const { nodeExternalsPlugin } = require("esbuild-node-externals");

build({
  entryPoints: ["src/bot.ts", "src/shard.ts"],
  bundle: true,
  outdir: "dist/",
  platform: "node",
  plugins: [nodeExternalsPlugin()],
  minify: true,
  sourcemap: false,
  logLevel: "info",
  color: true,
  tsconfig: "tsconfig.json",
  sourcesContent: false,
  allowOverwrite: true,
});