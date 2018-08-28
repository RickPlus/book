'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: STRING(30),
    avatar: STRING(255),
    weixin_openid : STRING(45),
    weixin_unionid : STRING(45),
    token : STRING(45),
    default_bookid : INTEGER,
    created_at: DATE,
    updated_at: DATE
  },{
    freezeTableName : true
  });

  return User;
};