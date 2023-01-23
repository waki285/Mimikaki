import type { Mimikaki } from "@/Mimikaki";
import type { CloseEvent } from "discord.js";
import { Event } from "@/interface";

export default class extends Event {
  public constructor(client: Mimikaki) {
    super(client, "shardDisconnect");
  }

  public run(event: CloseEvent, id: number): void {
    this.logger.info(
      `Shard: ${id} has disconnected.`,
      `Code: ${event.code}, Reason: ${event.reason}`,
    );
  }
}
