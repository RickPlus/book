'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Book = app.model.define('book', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(45),
    create_userid: INTEGER,
    created_at: DATE,
    updated_at: DATE
  },{
    freezeTableName : true
  });

  return Book;
};