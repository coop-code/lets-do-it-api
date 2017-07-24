let router = require('express').Router();

/* API Health Check */
router.get('/', function(req, res) {
	res.status(200).send("pong!");
});

module.exports = router;