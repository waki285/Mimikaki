import type { Mimikaki } from "@/Mimikaki";
import type { Command } from "@/interface";
import { Collection } from "discord.js";
import log4js from "log4js";

export class CommandManager extends Collection<string, Command> {
  private readonly logger = log4js.getLogger("CommandManager");

  public constructor(private readonly client: Mimikaki) {
    super();
  }

  public async registerAll(): Promise<void> {
    this.logger.info("Starting to register all commands");

    await import("@/commands/debug").then((i) =>
      this.set("debug", new i.default(this.client)),
    );

    this.logger.info(`Successfully registered ${this.size} commands`);
  }

  public async subscribe(): Promise<void> {
    const subscribed =
      (await this.client.application?.commands.fetch()) ?? new Collection();

    const diffAdded = this.filter(
      (c) => !subscribed.find((s) => s.name === c.data.name),
    );
    const diffRemoved = subscribed?.filter(
      (s) => !this.find((c) => s.name === c.data.name),
    );
    const diff = this.filter(
      (c) =>
        !(
          subscribed.find((s) => s.name === c.data.name)?.equals(c.data) ??
          false
        ),
    );

    for (const add of diffAdded.values()) {
      await this.client.application?.commands.create(add.data);
    }
    for (const remove of diffRemoved.values()) {
      await this.client.application?.commands.delete(remove.id);
    }
    for (const change of diff.values()) {
      const id = subscribed.find((s) => s.name === change.data.name)?.id;
      if (id) await this.client.application?.commands.edit(id, change.data);
    }
  }
}
