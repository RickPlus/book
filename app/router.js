'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.resources('user', '/api/user', controller.user);
  router.resources('book', '/api/book', controller.book);
  router.resources('bookuser', '/api/bookuser', controller.bookuser);
  router.resources('record', '/api/record', controller.record);
  router.resources('api/login', '/api/login', controller.login);
  router.resources('/restful', '/restful', controller.restful);   //test  restful
};
