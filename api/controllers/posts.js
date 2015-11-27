var Post = require('../models/post');
var Posts = require('../collections/posts');
var _ = require('lodash');

var Tags = require('../collections/tags');
var Tag = require('../models/tag');
var Category = require('../models/category');

function saveTags(tags) {
  // create tag objects
  var tagObjects = tags.map(function (tag) {
	return {
	  name: tag,
	  slug: tag.replace(/ /g, '-').toLowerCase()
	};
  });
  return Tags.forge()
  // fetch tags that already exist
  .query('whereIn', 'slug', _.pluck(tagObjects, 'slug'))
  .fetch()
  .then(function (existingTags) {
	var doNotExist = [];
	existingTags = existingTags.toJSON();
	// filter out existing tags
	if (existingTags.length > 0) {
	  var existingSlugs = _.pluck(existingTags, 'slug');
	  doNotExist = tagObjects.filter(function (t) {
		return existingSlugs.indexOf(t.slug) < 0;
	  });
	}
	else {
	  doNotExist = tagObjects;
	}
	// save tags that do not exist
	return new Tags(doNotExist).mapThen(function(model) {
	  return model.save()
	  .then(function() {
		return model.get('id');
	  });
	})
	// return ids of all passed tags
	.then(function (ids) {
	  return _.union(ids, _.pluck(existingTags, 'id'));
	});
  });
}

module.exports = {

	getPost : function(req,res){
		Posts.forge()
		.fetch()
		.then(function(collection){
			res.json({ error : false, data : collection.toJSON() });
		})
		.catch(function(err){
			res.status(500).json({error : true, data : {message : err.message}});
		});
	},

	getPostById : function(req, res){
		Post.forge({
			id : req.params.id
		})
		.fetch({withRelated : ['categories','tags', 'author'] })
		.then(function(post){
			if(!post){
				res.status(404).json({error : true, data : {} })
			}else{
				res.json({error : false, data : post.toJSON()});
			}
		})
		.catch(function(err){
			res.status(500).json({error : true, data : {message : err.message}})
		});
	},

	savePost : function(req, res){
		var tags = req.body.tags;

		// Parse tags variable
		if(tags){
			tags = tags.split(',').map(function(tag){
				return tag.trim();
			})
		}else{
			tags = ['uncategorised'];
		}

		console.log('Tags', tags)

		Post.forge({
			user_id : req.body.user_id,
			category_id : req.body.category_id,
			title : req.body.title,
			slug : req.body.title.replace(/ /g, '-').toLowerCase(),
			html : req.body.post
		})
		.save()
		.then(function(post){
			saveTags(tags)
			.then(function(ids){
				post.load(['tags'])
				.then(function(model){
					model.tags().attach(ids);
					res.json({
						error : false,
						data : {message : 'Tags saved'}
					})
				})
				.catch(function(err){
					res.status(500)
					.json({
						error : true,
						data : {message : err.message}
					})
				})
			})
			.catch(function(err){
				res.status(500)
				.json({
					error : true,
					data : {message : err.message}
				})
			})
		})
		.catch(function(err){
			res.status(500)
			.json({
				error : true,
				data : {message : err.message}
			})
		})
	},

	getCategoryById : function(req, res){
		Category.forge({ id : req.params.id })
		.fetch({withRelated : ['posts']})
		.then(function(category){
			var posts = category.related('posts');
			res.json({error : false, data : posts.toJSON()});
		})
		.catch(function(err){
			res.status(500).json({error:true, data : {message: err.message}})
		})
	}
}
