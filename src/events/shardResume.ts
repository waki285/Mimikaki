import type { Mimikaki } from "@/Mimikaki";
import { Event } from "@/interface";

export default class extends Event {
  public constructor(client: Mimikaki) {
    super(client, "shardResume");
  }

  public run(id: number, replayedEvents: number): void {
    this.logger.info(`Shard: ${id} has resumed. Replayed: ${replayedEvents}`);
  }
}
