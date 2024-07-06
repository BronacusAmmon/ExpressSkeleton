const router = require("express").Router();

const fileName = require("path").basename(__filename);

const { helloWorld } = require(`../controllers/${fileName}`);

router.get("/", helloWorld);

module.exports = router;
