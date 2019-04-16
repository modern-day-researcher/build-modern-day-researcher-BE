const localPg = {
  host: "localhost",
  database: 'dev',
  user: 'user',
  password: process.env.LOCALPG_PW
};
const productionDbConnection = process.env.DATABASE_URL || localPg;

module.exports = {
  development: {
    client: "sqlite3",
    connection: { filename: "./data/dev.sqlite3" },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",
      tableName: "dbmigrations"
    },
    seeds: { directory: "./data/seeds" }
  },
  production: {
    client: "postgresql",
    connection: productionDbConnection,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  }
};
