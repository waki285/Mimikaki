import dotenv from "dotenv";
import { ShardingManager } from "discord.js";
import { join } from "path";
import configLogger from "@/logger";
import { getLogger } from "log4js";
dotenv.config();
configLogger();

const logger = getLogger("ShardingManager");

if (!process.env.DISCORD_TOKEN) {
  logger.fatal("No token provided");
  process.exit(1);
}

const manager = new ShardingManager(join("dist", "bot.js"), {
  token: process.env.DISCORD_TOKEN,
  totalShards: "auto",
});

manager.spawn();

manager.on("shardCreate", (shard) => {
  logger.info(`Launched shard ${shard.id}`);
});