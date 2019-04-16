const knexCleaner = require('knex-cleaner')


exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knexCleaner.clean(knex);
};
