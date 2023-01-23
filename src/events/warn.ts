import type { Mimikaki } from "@/Mimikaki";
import { Event } from "@/interface";

export default class extends Event {
  public constructor(client: Mimikaki) {
    super(client, "warn");
  }

  public run(info: string): void {
    this.logger.warn("DJS Warning -", info);
  }
}
