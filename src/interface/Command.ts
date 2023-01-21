import type { Mimikaki } from "@/Mimikaki";
import type { ApplicationCommandData, Interaction } from "discord.js";
import type { Logger } from "log4js";
import log4js from "log4js";

export abstract class Command {
  protected readonly logger: Logger;

  protected constructor(
    protected readonly client: Mimikaki,
    public readonly data: ApplicationCommandData,
  ) {
    this.logger = log4js.getLogger(data.name);
  }

  public abstract run(interaction: Interaction): Promise<unknown>;
}
