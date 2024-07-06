const { logger } = require("../utils/logger");

exports.dataTrim = (req, res, next) => {
  if (req.method === "POST" || req.method === "PUT") {
    for (const [key, value] of Object.entries(req.body)) {
      if (typeof value === "string") req.body[key] = value.trim();
    }
  }
  next();
};

exports.authentication = (req, res, next) => {
  logger.error(
    "Add your own middleware, I am not responsible for your security"
  );
  next();
};
