'use strict';
const opentelemetry = require("@opentelemetry/sdk-node");
const { getNodeAutoInstrumentations } = require("@opentelemetry/auto-instrumentations-node");
const { diag, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api');
const api = require('@opentelemetry/api');

const { PgInstrumentation } = require('@opentelemetry/instrumentation-pg');
const { OTLPTraceExporter } = require("@opentelemetry/exporter-trace-otlp-proto");
const { envDetector, hostDetector, osDetector, processDetector } = require('@opentelemetry/resources')



const {
  CompositePropagator,
  W3CBaggagePropagator,
  W3CTraceContextPropagator,
} = require("@opentelemetry/core");

// const Resource = require("@opentelemetry/resources");
// const SemanticResourceAttributes = require("@opentelemetry/semantic-conventions");

// For troubleshooting, set the log level to DiagLogLevel.DEBUG
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

// const providerConfig = {
//     resource: new Resource({
//         [SemanticResourceAttributes.SERVICE_NAME]: "node-express-otel"
//     }),
//   };

const consoleExporter = new opentelemetry.tracing.ConsoleSpanExporter();
const newRelicExporter = new OTLPTraceExporter({
    url:'https://otlp.nr-data.net:4318/v1/traces',
    headers: {
        'api-key' : 'f5644626eef13f26d27746c6e381555ef9f9NRAL'
    }
});


api.propagation.setGlobalPropagator(new CompositePropagator({
  propagators:[
    new W3CBaggagePropagator(),
    new W3CTraceContextPropagator()
  ]
}))

const sdk = new opentelemetry.NodeSDK({
  traceExporter: newRelicExporter,
  serviceName: "node-express-otel",
  instrumentations: [getNodeAutoInstrumentations({
    "@opentelemetry/instrumentation-pg" : {
      requireParentSpan: true,
      enhancedDatabaseReporting: true
    },
    "@opentelemetry/instrumentation-http" : {
      ignoreIncomingRequestHook(req) {
        const isIgnoredRoute = !!req.url.match(/^(https?:\/\/)?([\da-z\.-]+)(\/[\d|\w]{2})(\/api\/traces)/);
        return isIgnoredRoute;
      }
    },
    "@opentelemetry/instrumentation-express" : {
      enabled: true
    },
    
  })
],
  autoDetectResources: true
});

sdk.start();
 
// function sdkStart() {
//     sdk.start()
// }

// module.exports = { sdkStart }