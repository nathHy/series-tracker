var bookshelf = require('../helpers/bookshelf.js');

var Season = bookshelf.Model.extend({
	tableName:'season',
	initialize: function() {
		this.on('saving',function (model,cols) {
			// Validate
			if (model.attributes.name == undefined) {
				throw new Error("No name defined")	
			}
		});
	}
})

module.exports = Season