import type { Mimikaki } from '@/Mimikaki';
import type {
  BaseMessageOptions,
  DiscordAPIError,
  Interaction,
} from 'discord.js';
import { inspect } from 'util';
import { Colors } from 'discord.js';
import { Event } from '@/interface';
import { ChannelManager, i18n, userManager } from '@/manager';

export default class extends Event {
  public constructor(client: Mimikaki) {
    super(client, 'interactionCreate');
  }

  public async run(interaction: Interaction): Promise<void> {
    this.logger.trace('Received interaction event');

    const userData = await userManager.getUserData(interaction.user.id);

    try {
      if (
        interaction.isChatInputCommand() ||
        interaction.isContextMenuCommand()
      ) {
        await this.client.commandManager
          .get(interaction.commandName)
          ?.run(interaction);
      }
      
    } catch (e) {
      this.logger.error(e);

      const exec =
        /^\/interactions\/\d+\/(?<token>.+)\/callback$/.exec(
          (e as DiscordAPIError).url
        )?.groups ?? {};
      const message: BaseMessageOptions = {
        embeds: [
          {
            color: Colors.Red,
            title: i18n.t(userData.language, 'error.error'),
            description: inspect(e, {
              depth: 1,
              maxArrayLength: null,
            })
              .substring(0, 4096)
              .replaceAll(exec['token'] ?? 'ABCDEFGHIJKLMN', '*redacted*'),
          },
        ],
      };
      ChannelManager.sendErrorLog(e);

      if (
        interaction.isChatInputCommand() ||
        interaction.isContextMenuCommand() ||
        interaction.isButton() ||
        interaction.isStringSelectMenu()
      ) {
        if (interaction.replied || interaction.deferred) {
          await interaction
            .editReply(message)
            .catch((err) => this.logger.error(err));
        } else {
          await interaction
            .reply(message)
            .catch((err) => this.logger.error(err));
        }
      }
    }
  }
}