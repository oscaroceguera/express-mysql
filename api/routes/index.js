var express = require('express');

var usersCtrl = require('../controllers/users');
var categoriesCtrl = require('../controllers/categories');
var usersCtrl = require('../controllers/users');
var postsCtrl = require('../controllers/posts');

module.exports = (function () {

	var api = express.Router();

	api.get('/users', usersCtrl.getUsers);
  	api.post('/users', usersCtrl.saveUser);
  	api.get('/users/:id', usersCtrl.getUserById);
  	api.put('/users/:id', usersCtrl.updateUser);
  	api.delete('/users/:id', usersCtrl.deleteUser);

  	api.post('/categories', categoriesCtrl.saveCategory);
  	api.get('/categories', categoriesCtrl.getCategories);
  	api.get('/categories/:id', categoriesCtrl.getCategoryById);
  	api.put('/categories/:id', categoriesCtrl.updateCategory);
  	api.delete('/categories/:id', categoriesCtrl.deleteCategory);

	api.get('/posts', postsCtrl.getPost);
	api.get('/posts/:id', postsCtrl.getPostById);
	api.post('/posts', postsCtrl.savePost);
	api.get('/posts/category/:id', postsCtrl.getCategoryById);

  	return api;

})();
