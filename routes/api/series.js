var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.send("This will provide the series");
});
router.get('/:series_id', function(req, res) {
	res.send("Getting details on series with id " + req.params.series_id);
});

router.get('/:series_id/season/', function(req, res) {
	res.send("Getting list of seasons on series with id " + req.params.series_id);
});


router.get('/:series_id/season/:season_id', function(req, res) {
	res.send("Getting details on series with id " + req.params.series_id + " and season id of " + req.params.season_id );
});

router.get('/:series_id/season/:season_id/episode', function(req, res) {
	res.send("Getting list of episodes on series with id " + req.params.series_id + 
								" and season id " + req.params.season_id) 
});

router.get('/:series_id/season/:season_id/episode/:episode_id', function(req, res) {
	res.send("Getting details on series with id " + req.params.series_id + 
								" and season id " + req.params.season_id + 
							   " and episode id " + req.params.episode_id );
});

module.exports = router;
