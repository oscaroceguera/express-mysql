var Bookshelf = require('../commons/bookshelf');

var Category = require('../models/category');

var Categories = Bookshelf.Collection.extend({
	model : Category
});

module.exports = Categories;
