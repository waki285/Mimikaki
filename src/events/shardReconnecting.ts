import type { Mimikaki } from "@/Mimikaki";
import { Event } from "@/interface";

export default class extends Event {
  public constructor(client: Mimikaki) {
    super(client, "shardReconnecting");
  }

  public run(id: number): void {
    this.logger.info(`Shard: ${id} is now reconnecting.`);
  }
}
