var bookshelf = require('../helpers/bookshelf.js');
var User = require('./user');

var List = bookshelf.Model.extend({
	tableName:'list'
})

module.exports = List