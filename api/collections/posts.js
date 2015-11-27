var Bookshelf = require('../commons/bookshelf');

var Post = require('../models/post');

var Posts = Bookshelf.Collection.extend({
	model : Post
});

module.exports = Posts;
