var Bookshelf = require('../commons/bookshelf');
Bookshelf.plugin('registry');

var Post = require('./post');

var Tag = Bookshelf.Model.extend({
  tableName: 'tags',

  posts : function(){
	  return this.belongsToMany('Post')
  }
});

module.exports = Bookshelf.model('Tag', Tag);
