const path = require("path")
require('dotenv').config({ path: "../.env" });
module.exports = {

  development: {
    client: process.env.CLIENT,
    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.db")
    },
    pool:{
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
    },
    migrations: {
      directory: path.resolve(__dirname,"src", "database", "knex", "migrations")
    },
    useNullAsDefault: true
  },
};