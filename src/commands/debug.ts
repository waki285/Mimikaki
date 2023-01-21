import type { Mimikaki } from "@/Mimikaki";
import { ChannelType, ChatInputCommandInteraction } from "discord.js";
import { ApplicationCommandType } from "discord.js";
import { Command } from "@/interface";
import osUtils from "os-utils";
import { execSync } from "child_process";
const cpuUsage = () =>
  new Promise<number>((resolve) => osUtils.cpuUsage(resolve));

export default class extends Command {
  public constructor(client: Mimikaki) {
    super(client, {
      type: ApplicationCommandType.ChatInput,
      name: "debug",
      description: "🐛 Debugging command",
      descriptionLocalizations: {
        ja: "🐛 デバッグ用コマンド",
      },
      dmPermission: false,
    });
  }

  public async run(interaction: ChatInputCommandInteraction): Promise<void> {
    const shardId = interaction.guild?.shardId;

    const authorPermissions =
      interaction.channel?.type === ChannelType.GuildText
        ? interaction.channel
            .permissionsFor(interaction.user)
            ?.bitfield.toString()
        : "Not in guild";
    const botPermissions =
      interaction.channel?.type === ChannelType.GuildText
        ? interaction.channel
            .permissionsFor(interaction.client.user)
            ?.bitfield.toString()
        : "Not in guild";

    const version = execSync(
      'git log --date=iso --date=format:"%Y/%m/%d" --pretty=format:"%h (%ad)" -1',
    ).toString();

    await interaction.reply({
      embeds: [
        {
          title: "Debug info",
          description:
            `Ping: \`${this.client.ws.ping}ms\`\n` +
            `Shard ID: \`${shardId !== null ? shardId : "Not in guild"}\`\n` +
            `Guild ID: \`${interaction.guildId || "Not in guild"}\`\n` +
            `Channel ID: \`${interaction.channelId || "Not in guild"}\`\n` +
            `Author ID: \`${interaction.user.id}\`\n` +
            `Author Permissions: \`${authorPermissions}\`\n` +
            `Bot Permissions: \`${botPermissions}\`\n` +
            `Version: \`${version}\`\n` +
            `CPU: \`${Math.round((await cpuUsage()) * 100)}%\`\n` +
            `Memory: \`${Math.round(osUtils.freememPercentage() * 100)}%\``,
        },
      ],
      ephemeral: true,
    });
  }
}
