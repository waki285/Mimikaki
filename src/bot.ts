import { Mimikaki } from "./Mimikaki";

const instance = new Mimikaki();
instance.start().catch(console.error);

["SIGINT", "SIGTERM", "SIGQUIT"].forEach((signal) => {
  process.on(signal, async () => {
    await instance.stop();
    process.exit(0);
  });
});