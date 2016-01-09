var knex = require('knex')({
	client: 'mysql',
	connection: {
		host     : 'localhost',
		user     : 'root',
		password : 'root',
		database : 'showtracker',
		charset : 'utf8'
		// debug:true
	}
});


module.exports = require('bookshelf')(knex);