var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.send("This will provide the genres");
});

router.get('/:id', function(req, res) {
	res.send("Getting details on genre with id " + req.params.id);
});

module.exports = router;
