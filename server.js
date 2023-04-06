var newrelic = require('newrelic');
const logger = require("./app/logger");
// let appInsights = require('applicationinsights');

const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "*"
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//set custom headers
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Headers", ["newrelic","traceparent","tracestate"]);
  return next();
});

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    logger.info("Connected to the database!");
  })
  .catch(err => {
    logger.error("Cannot connect to the database!", err);
    process.exit();
  });

// appInsights.setup("InstrumentationKey=4875a1a1-d538-4e9d-95d7-506fafa20853;IngestionEndpoint=https://eastus-8.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus.livediagnostics.monitor.azure.com/")
// .setAutoCollectConsole(true, true)
// .start();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to tutorial application." });
});

require("./app/routes/turorial.routes")(app);
const weather = require("./app/routes/weather.routes");
app.use("/api/weather",weather);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
try {
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}.`);
  });
  
} catch (error) {
  console.error(error);
}