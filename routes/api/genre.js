var express = require('express');
var Genre   = require('../../models/genre')
var router  = express.Router();


router.route('/')
.get(function (req, res) {
	Genre.forge().fetchAll().then(function (genres) {
		res.json({error:false,data:genres.toJSON()})
	})
})
.post(function(req,res) {
	var name = req.body.name;
	Genre.forge({
		name:name
	})
	.save()
	.then(function (genre) { 
		res.json({error:false,data:{id:genre.get('id')}});
	})
	.catch(function (err) {
		res.json({error:true,data:{message:err.message}});
	})
});

router.route('/:id')
.get(function (req,res) {
	var genreId=req.params.id;
	Genre.forge({id:genreId})
	.fetch({id:genreId,require:true})
	.then(function (genre) {
		res.json({error:false,data:genre.toJSON()});
	})
	.catch(function (err) {
		if (err.message == 'EmptyResponse')
			res.json({error:false,data: {message:'No genre found with id ' + genreId}});
	})
})

module.exports = router;
