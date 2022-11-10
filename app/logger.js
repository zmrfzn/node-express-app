const { createLogger, transports, format } = require("winston");
const { combine, timestamp,prettyPrint } = format;


// Imports the Google Cloud client library for Winston
const {LoggingWinston} = require('@google-cloud/logging-winston');

const loggingWinston = new LoggingWinston();


const logger = createLogger({
  level: "info",
  format: combine(
    timestamp(),
    prettyPrint()
  ),
  //logger method...
  transports: [
    //new transports:
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/app.log' }),
    loggingWinston
  ],
  //...
});

module.exports = logger;