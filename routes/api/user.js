var _       = require('lodash')
var express = require('express');
var User    = require('../../models/user')
var router  = express.Router();

router.route('/')
.get(function (req, res) {
	var result=User.fetchAll().then(function (users) {
		console.log(users.toJSON());
	  	res.send(users.toJSON());
	});

})
.post(function (req,res,next) {
	console.log('Creating user');
	console.log(req.body)
	var username = req.body.username;
	var password = req.body.password;
	var email    = req.body.email;
	if (username === undefined || password === undefined || email === undefined) {
		res.json({error:true,data:{message:"Please provide a username,password and email"}});
	}

	User.forge({ // forge initiates a new object in the table.
		username:username,
		password:password
	})
	.save() // save returns a promise.
	.then(function (user) {
		res.json({error:false,data:{id:user.get('id')}});
	}) 
	.catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    }); 
})

router.get('/me', function (req,res) {
	console.log(req);
	res.send('You are logged in as <user>'); // TODO. local storage?
}); 

router.route('/:id')
.get(function (req,res) {
	var userId=req.params.id;
	User.forge({id:userId})
	.fetch({id:userId,require:true})
	.then(function (user) {
		res.json({error:false,data:user.toJSON()});
	})
	.catch(function (err) {
		if (err.message == 'EmptyResponse')
			res.json({error:false,data: {message:'No User found with id ' + userId}});
	})
})
.delete(function (req,res,next) {
	var userId=req.params.id;
	console.log("Deleteing user " + userId);
	User.forge({id:userId})
	.fetch({require:true})
	.then(function (user) {
		user.destroy()
		.then(function () {
			res.json({error: false, data: {message: 'User successfully deleted'}});
		})
      	.catch(function (err) {
        	res.status(500).json({error: true, data: {message: err.message}});
      	});
	})
	.catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
})
.patch(function (req,res,next) {
	var userId   = req.params.id;
	var email    = req.body.email;
	var password = req.body.password;
	User.forge({id:userId})
	.fetch({require:false})
	.then(function (user) {
		if (user == null) res.json({error:true, data:{message:'User does not exist with id ' + userId}});
		user.save({
			email:email,
			password:password
		})
		.then(function () {
			res.json({error:false, data:{message:'User succesfully patched'}});
		})
		.catch(function (err) {
			res.json({error:true, data:{message:err.message}});
		})
	})
	.catch(function (err) {
		console.log(err);
		res.json({error:true, data:{message:err.message}});
	})
})

router.post('/:id', function (req,res,next) {

})
module.exports = router;
