var Bookshelf = require('../commons/bookshelf');

var Tag = require('../models/tag');

var Tags = Bookshelf.Collection.extend({
	model : Tag
});

module.exports = Tags;
