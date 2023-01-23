import { EmbedBuilder } from "discord.js";

export const botAdministrators = process.env.BOT_ADMINS?.split(",") ?? [];