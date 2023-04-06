const { createLogger, transports, format } = require("winston");
const { combine, timestamp,prettyPrint } = format;

const logger = createLogger({
  level: "info",
  format: combine(
    timestamp(),
    format.json(),
  ),
  //logger method...
  transports: [
    //new transports:
    new transports.Console(),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/app.log' }),
  ],
  //...
});

module.exports = logger;