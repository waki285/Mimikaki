import type { Mimikaki } from "@/Mimikaki";
import type { Logger } from "log4js";
import log4js from "log4js";

export abstract class Event {
  protected readonly logger: Logger;

  protected constructor(
    protected readonly client: Mimikaki,
    public readonly name: string,
  ) {
    this.logger = log4js.getLogger(name);
  }

  public abstract run(...args: unknown[]): void;
}
