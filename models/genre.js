var bookshelf = require('../helpers/bookshelf.js');

var Genre = bookshelf.Model.extend({
	tableName:'genre',
	initialize: function() {
		this.on('saving',function (model,cols) {
			// Validate
			if (model.attributes.name == undefined) {
				throw new Error("No name defined")	
			}
		});
	}
})

module.exports = Genre