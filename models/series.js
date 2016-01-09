var bookshelf = require('../helpers/bookshelf.js');

var Series = bookshelf.Model.extend({
	tableName:'series',
	initialize: function() {
		this.on('saving',function (model,cols) {
			// Validate
			if (model.attributes.name == undefined) {
				throw new Error("No name defined")	
			}
		});
	}
})

module.exports = Series