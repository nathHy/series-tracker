var express = require('express');
var Series = require('../../models/series.js')
var Season = require('../../models/season.js')
var rh = require('../../helpers/routeHelper.js')
var router = express.Router();

console.log("Router")

router.param('series_id', function(req,res,next,series_id) {
	var seriesId = Number(req.params.series_id)
	if (!rh.isInt(seriesId)) {
		res.json({error:true,data:{message:'Please provide a integer for the ID'}});
		return;
	}
	
	Series.forge({id:seriesId})
	.fetch({id:seriesId,require:true})
	.then(function (series) {
		req.series=series;
		next();
	})
	.catch(function (err) {
		if (err.message == "EmptyResponse")
			res.json({error:true,data:{message:'No series by id ' + seriesId}});
		else 
			next(err);
	})

})

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
	res.json(rh.sendJSON(true,req.series.toJSON()));
});

router.route('/:series_id/season/')
.get(function(req, res) {
	Season.forge()
	.fetch({require:true})
	.then(function (seasons) {
		res.json({error:false,data:seasons.toJSON()});
	})
	.catch(function (err) {
		if (err.message == "EmptyResponse")
			res.json({error:true,data:{message:'No seasons for series with id ' + req.series.get('id')}});
		else 
			res.json({error:true,data:{message:err.message}});
	})
});


router.get('/:series_id/season/:season_id', function(req, res) {

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
