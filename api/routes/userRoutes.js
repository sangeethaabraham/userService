'use strict';
module.exports = function(app) {
  var Users = require('../controllers/userController');

  // todoList Routes
  app.route('/users')
    .get(Users.list_all_users)
    .post(Users.create_a_user);


  app.route('/users/:userId')
    .get(Users.read_a_user)
    .put(Users.update_a_user)
    .delete(Users.delete_a_user);
};