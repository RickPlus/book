'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Bookuser = app.model.define('bookuser', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    book_id : INTEGER,
    user_id : INTEGER,
    created_at: DATE,
    updated_at: DATE
  },{
    freezeTableName : true
  });

  return Bookuser;
};