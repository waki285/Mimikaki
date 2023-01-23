import type { Mimikaki } from '@/Mimikaki';
import type { Client } from 'discord.js';
import { Event } from '@/interface';
import fs from 'fs';

export default class extends Event {
  public constructor(client: Mimikaki) {
    super(client, 'ready');
  }

  public async run(client: Client<true>): Promise<void> {
    this.logger.info('Succesfully logged in and is Ready.');
    this.logger.trace(
      `Cached ${client.guilds.cache.size} guild${
        client.guilds.cache.size <= 1 ? '' : 's'
      }`
    );

    this.client.ready = true;
    client.user.setActivity({
      // @ts-expect-error
      name: `Serving ${(await this.client.shard?.fetchClientValues("guilds.cache.size"))?.reduce((a: number, b: number) => a + b)} guilds`,
    });

    this.logger.info('Starting to subscribe commands to Discord Server');
    await this.client.commandManager
      .subscribe()
      .then(() =>
        this.logger.info('Succesfully subscribed commands to Discord Server')
      )
      .catch((e) => this.logger.error('There was an error subscribing', e));
  }
}