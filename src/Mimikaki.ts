import { Client , GatewayIntentBits, Partials } from "discord.js";
import { getLogger } from "log4js";
import configLogger from "@/logger";
import { CommandManager } from '@/manager';


export class Mimikaki extends Client {
  private logger = getLogger("Mimikaki");
  private _ready = false;


  public readonly commandManager: CommandManager;

  constructor() {
    super({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
      partials: [Partials.Message],
      allowedMentions: { repliedUser: false }
    });
    configLogger();
    this.commandManager = new CommandManager(this);
  }
  public get ready(): boolean {
    return this._ready;
  }
  public set ready(value: boolean) {
    this._ready = value;
  }
  public async start() {
    this.logger.info(`PID ${process.pid} Starting...`);

    await import("@/events/ready").then((module) => {
      this.once("ready", new module.default(this).run);
    });
    await import("@/events/warn").then((module) => {
      this.on("warn", new module.default(this).run);
    });
    await import("@/events/error").then((module) => {
      this.on("error", new module.default(this).run);
    });

    await import("@/events/shardDisconnect").then((module) => {
      this.on("shardDisconnect", new module.default(this).run);
    });
    
    await import("@/events/shardError").then((module) => {
      this.on("shardError", new module.default(this).run);
    });
    await import("@/events/shardReconnecting").then((module) => {
      this.on("shardReconnecting", new module.default(this).run);
    });
    await import("@/events/shardResume").then((module) => {
      this.on("shardResume", new module.default(this).run);
    });
    await import("@/events/shardReady").then((module) => {
      this.on("shardReady", new module.default(this).run);
    });

  }
  public async stop() {}
}