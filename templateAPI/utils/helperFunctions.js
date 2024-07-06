const fs = require("fs");

const { logger } = require("../utils/logger");

exports.fileList = (path) => {
  return (files = fs
    .readdirSync(path, { withFileTypes: true }, (err) => {
      if (err) {
        logger.error(err);
      }
    })
    .filter((file) => file.isFile())
    .map((file) => file.name));
};
