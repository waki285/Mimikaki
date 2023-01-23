import type { Mimikaki } from '@/Mimikaki';
import { Event } from '@/interface';

export default class extends Event {
  public constructor(client: Mimikaki) {
    super(client, 'shardError');
  }

  public run(error: Error, id: number): void {
    this.logger.info(`Shard: ${id} has occured an error.`, error);
  }
}
