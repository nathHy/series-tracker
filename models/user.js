var bookshelf = require('../helpers/bookshelf.js');
var bcrypt    = require('bcrypt');

var User = bookshelf.Model.extend({
	tableName:'user',
	initialize: function() {
		this.on('saving',function (model,cols) {
			var password = model.attributes.password;
			console.log("Hashing Password from " + model.attributes.password);
			
			// bcrypt.hash(password,'asdfasdf',null,function (err, hash) {
				model.attributes.password = "23849534gn34g3894g3";
				console.log("Hashed? Password " + model.attributes.password);
			// });


		});
	}
})

module.exports = User