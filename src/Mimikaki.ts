import { Client , GatewayIntentBits, Partials } from "discord.js";
import { getLogger } from "log4js";
import configLogger from "@/logger";
import { CommandManager } from '@/manager';
import mongoose from "mongoose";
import log4js from 'log4js';


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
      this.once("ready", (c) => new module.default(this).run(c));
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

    await import("@/events/interactionCreate").then((module) => {
      this.on("interactionCreate", (i) => new module.default(this).run(i));
    });

    await this.commandManager.registerAll().catch((e) => this.logger.error(e));
    
    mongoose.set("strictQuery", true);
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI is not defined");
    await mongoose.connect(process.env.MONGO_URI).catch((e) => this.logger.error(e));

    this.logger.info('Initialize done. Logging in...');
    await super.login(process.env.TOKEN).catch((e) => this.logger.error(e));
  }
  public async stop() {
    this.logger.info(`PID ${process.pid} Stopping...`);
    this.ready = false;
    this.destroy();
    await mongoose.disconnect().catch((e) => this.logger.error(e));
    log4js.shutdown();

    process.exit();
  }
}