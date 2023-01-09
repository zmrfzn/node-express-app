"use strict";

const { diag, DiagConsoleLogger, DiagLogLevel } = require("@opentelemetry/api");

// SDK
const opentelemetry = require("@opentelemetry/sdk-node");

// Express, postgres and http instrumentation
const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");
const { registerInstrumentations } = require("@opentelemetry/instrumentation");
const { HttpInstrumentation } = require("@opentelemetry/instrumentation-http");
const {
  ExpressInstrumentation,
} = require("@opentelemetry/instrumentation-express");
const {
  getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node");

const { PgInstrumentation } = require("@opentelemetry/instrumentation-pg");

// Collector trace exporter
const { Resource } = require("@opentelemetry/resources");
const {
  SemanticResourceAttributes,
} = require("@opentelemetry/semantic-conventions");
const {
  SimpleSpanProcessor,
  ConsoleSpanExporter,BatchSpanProcessor
} = require("@opentelemetry/sdk-trace-base");
const {
  OTLPTraceExporter,
} = require("@opentelemetry/exporter-trace-otlp-http");

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

// Tracer provider
const provider = new NodeTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: "node-express-otel",
  }),
});

registerInstrumentations({
  instrumentations: [
    // Currently to be able to have auto-instrumentation for express
    // We need the auto-instrumentation for HTTP.
    new HttpInstrumentation(),
    new getNodeAutoInstrumentations(),
    new PgInstrumentation(),
  ],
});

// Tracer exporter
// const newRelicExporter = new OTLPTraceExporter({
//     url:'https://otlp.nr-data.net:4318/v1/traces',
//     headers: {
//         'api-key' : 'f5644626eef13f26d27746c6e381555ef9f9NRAL'
//     }
// });
// provider.addSpanProcessor(new SimpleSpanProcessor(newRelicExporter));
provider.addSpanProcessor(new BatchSpanProcessor(new ConsoleSpanExporter()));
provider.register();

// SDK configuration and start up
const sdk = new opentelemetry.NodeSDK();

(async () => {
  try {
    await sdk.start();
    console.log("Tracing started.");
  } catch (error) {
    console.error(error);
  }
})();

// For local development to stop the tracing using Control+c
process.on("SIGINT", async () => {
  try {
    await sdk.shutdown();
    console.log("Tracing finished.");
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
});
