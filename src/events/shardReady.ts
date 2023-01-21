import type { Mimikaki } from "@/Mimikaki";
import { Event } from "@/interface";

export default class extends Event {
  public constructor(client: Mimikaki) {
    super(client, "shardReady");
  }

  public run(id: number, unavailableGuilds: Set<string> | undefined): void {
    const unavailable = unavailableGuilds?.size ?? 0;
    this.logger.info(
      `Shard: ${id} is now ready.`,
      unavailable === 0
        ? ""
        : `${unavailable} guild${
            unavailable === 1 ? " is" : "s are"
          } unavailable ATM`,
    );
  }
}
