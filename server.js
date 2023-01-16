const logger = require("./app/logger");

const express = require("express");
const cors = require("cors");
const path = require('path');

const app = express();

var corsOptions = {
  origin: "*"
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

console.info(`log path => ${path.resolve(__dirname, '/../../build')}`)

//set custom headers @deprecated
// app.use(function(req, res, next) {
//   res.setHeader("Access-Control-Allow-Headers", ["newrelic","traceparent","tracestate"]);
//   return next();
// });

const db = require("./app/models");
db.sequelize
  .sync()
  .then(() => {
    logger.info("Synced & Connected to the database!");
  })
  .catch((err) => {
    logger.error("Cannot connect to the database!", err.message);
    console.error("Cannot connect to the database!", err.message);
    process.exit();
  });

// simple route
app.get("/health", (req, res) => {
  res.json({ message: "Welcome to tutorial application." });
});

require("./app/routes/turorial.routes")(app);
const weather = require("./app/routes/weather.routes");
app.use("/api/weather",weather);
// const webAppRouter = require('./app/routes/web.routes'); 
// app.use('/',webAppRouter)

app.use(express.static(path.join(__dirname, '/build')));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/build", "index.html"));
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
try {
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}.`);
  });
  
} catch (error) {
  console.error(error);
}