'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Book = app.model.define('record', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    book_id : INTEGER,
    user_id : INTEGER,
    content : STRING(255),
    cost : Float32Array,
    created_at: DATE,
    updated_at: DATE
  },{
    freezeTableName : true
  });

  return Book;
};