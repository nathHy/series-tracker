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

	User.forge({ // forge insiates a new object in the table.
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
	res.send('You are logged in as <user>');
}); 

router.route('/:id')
.get(function (req,res) {
	res.send('Getting user details for id ' + req.params.id);
})
.delete(function (req,res,next) {
	var userId=req.params.id;
	console.log("Deleteing user " + userId);
	User.forge({id:userId})
	.fetch({requre:true})
	.then(function (user) {
		user.destroy()
		.then(function () {
			res.json({error: true, data: {message: 'User successfully deleted'}});
		})
      	.catch(function (err) {
        	res.status(500).json({error: true, data: {message: err.message}});
      	});
	})
	.catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
});

router.post('/:id', function (req,res,next) {

})
module.exports = router;
