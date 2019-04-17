exports.up = function(knex) {
  return knex.schema.createTable("articles", tbl => {
    tbl.increments();
    tbl.string("category").notNullable();
    tbl.string("title");
    tbl.string("url").notNullable();
    tbl.string("description");
    tbl.boolean("is_read").defaultTo(false);
    tbl
      .integer("user_id")
      .references("id")
      .inTable("users");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("articles");
};
