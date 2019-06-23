module.exports = {
  client: "postgresql",
  connection: {
    database: "candor",
    user: "candor",
    password: "candor"
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: "knex_migrations"
  }
};
