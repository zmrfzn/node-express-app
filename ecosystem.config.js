module.exports = {
    apps : [{
      name   : "expressApp-otel",
      script : "./server.js",
      out_file:"logs/app.log",
      error_file:"logs/error.log",
      log_date_format:"YYYY-MM-DD HH:mm Z",
      env: {
        "PORT": 8090 
      }
    }]
  }