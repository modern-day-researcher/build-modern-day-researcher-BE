module.exports = {
  development: {
    client: 'sqlite3',
    connection: { filename: './data/dev.sqlite3' },
    useNullAsDefault: true, // used to avoid warning on console
    migrations: {
      directory: './data/migrations',
      tableName: 'dbmigrations',
    },
    seeds: { directory: './data/seeds' },
  },
};
