const router = require("express").Router();

const fileName = require("path").basename(__filename);

const { secureWorld } = require(`../../controllers/auth/${fileName}`);

router.get("/", secureWorld);

module.exports = router;
