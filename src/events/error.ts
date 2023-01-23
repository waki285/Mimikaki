import type { Mimikaki } from "@/Mimikaki";
import { Event } from "@/interface";

export default class extends Event {
  public constructor(client: Mimikaki) {
    super(client, "error");
  }

  public run(info: Error): void {
    this.logger.error("DJS Error -", info);
  }
}
