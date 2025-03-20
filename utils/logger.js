const { pino } = require("pino");

//user for better logging
const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      translateTime: "SYS:dd-mm-yyyy HH:MM:SS",
      ignore: "pid,hostname",
    },
  },
});

module.exports = logger;
