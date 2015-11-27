var Bookshelf = require('../commons/bookshelf');
Bookshelf.plugin('registry')

var Category = require('./category')

var Tag = require('./tag')
var User = require('./user')

var Post = Bookshelf.Model.extend({

  tableName: 'posts',

  hasTimestamps: true,

  categories: function () {
    return this.belongsTo('Category', 'category_id');
  },

  tags: function () {
    return this.belongsTo(Tag);
  },

  author: function () {
    return this.belongsTo(User);
  }
});

module.exports = Bookshelf.model('Post',Post);
