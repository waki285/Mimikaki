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

  }
  public async stop() {}
}