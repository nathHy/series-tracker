var express = require('express');
var Series = require('../../models/series.js')
var rh = require('../../helpers/routeHelper.js')
var router = express.Router();

console.log("Router")
router.route('/')
.get(function (req, res) {
			Series.fetchAll().then(function (series) {
	  		res.send(series.toJSON());
	})
})
.post(function (req,res,next) {
	var name = req.body.name;
	var imdb = req.body.imdb;

	Series.forge({ // forge initiates a new object in the table.
		name:name,
		imdb:imdb
	})
	.save() // save returns a promise.
	.then(function (series) {
		res.json({error:false,data:{id:series.get('id')}});
	}) 
	.catch(function (err) {
		if (err.message == 'No name defined') 
			res.status(422);
		else 
			res.status(500);
      res.json({error: true, data: {message: err.message}});
    }); 
});
router.get('/:series_id', function(req, res) {
	var seriesId = req.params.series_id
	Series.forge({id:seriesId})
	.fetch({id:seriesId,require:true})
	.then(function (series) {
		console.log(series)
		res.json(rh.sendJSON(false,series.toJSON()));
	})
	.catch(function (err) {
		res.json(rh.sendJSON(true,{message:err.message}));
	})
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
