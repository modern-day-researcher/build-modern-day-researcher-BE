
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
      tbl.increments();
      tbl.string('username', 42).notNullable().unique();
      tbl.string('password', 128).notNullable();
      tbl.string('first_name', 42);
      tbl.string('last_name', 42);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
