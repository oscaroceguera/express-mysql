var Bookshelf = require('../commons/bookshelf');
Bookshelf.plugin('registry');

var Post = require('./post');

var Category = Bookshelf.Model.extend({

  tableName: 'categories',

  hasTimestamps: true,

  posts : function () {
	  return this.hasMany('Post');
   }

});

module.exports = Bookshelf.model('Category', Category);
