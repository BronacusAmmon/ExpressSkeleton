const bunyan = require("bunyan");

exports.logger = bunyan.createLogger({
  name: "bunyan-log",
  streams: [
    {
      level: "info",
      stream: process.stdout,
    },
    {
      level: "error",
      path: `${process.cwd()}/manifest/error.log`,
    },
  ],
});
