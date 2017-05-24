var router = require('express').Router();

/* Ping */
router.get('/', function(req, res) {
	"use strict";
	res.status(200).send("pong!");
});

module.exports = router;