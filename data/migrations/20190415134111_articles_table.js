
exports.up = function(knex) {
    return knex.schema.createTable('articles', tbl => {
        tbl.increments();
        tbl.string('category').notNullable();
        tbl.string('title').notNullable();
        tbl.string('url').notNullable();
        tbl.string('description').notNullable();
        tbl.boolean('is_read').notNullable().defaultTo(false);
        tbl.integer('user_id').references('id').inTable('users');
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('articles');
};
