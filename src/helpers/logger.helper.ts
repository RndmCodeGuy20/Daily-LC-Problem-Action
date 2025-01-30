const pretty = require("pino-pretty");
const pino = require("pino");

export const logger = pino(
  {
    name: "action",
    level: "debug",
    formatters: {
      level(label: string) {
        return { level: label };
      },
    },
  },
  pretty({
    colorize: true,
    singleLine: false,
    ignore: "pid, hostname, module",
  })
);
