const express = require('express');
require('./database/index');

const routes = express.Router();
const UserController = require('./controllers/UserController');
const AuthController = require('./controllers/AuthController');

const AuthMiddleware = require('./middlewares/auth');
const AdminMiddleware = require('./middlewares/admin');

routes.get(
  '/users',
  AuthMiddleware.auth,
  AdminMiddleware.isAdmin,
  UserController.index,
);
routes.get(
  '/users/:id',
  AuthMiddleware.auth,
  AdminMiddleware.isAdmin,
  UserController.show,
);

routes.post('/users', UserController.store);
routes.put(
  '/users/:id',
  AuthMiddleware.auth,
  AdminMiddleware.isAdmin,
  UserController.update,
);
routes.delete(
  '/users/:id',
  AuthMiddleware.auth,
  AdminMiddleware.isAdmin,
  UserController.destroy,
);

routes.post('/auth', AuthController.store);
/* 
routes.post('/forgot_password',AuthController.resetPass) */
module.exports = routes;
