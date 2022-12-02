const path = require("path");

require("dotenv").config();

const {
  DATABASE_URL = "postgresql://postgres@localhost/postgres",
} = process.env;

module.exports = {
  development: {
    client: "postgresql",
    connection: "postgres://zejcwtxv:yAN-BnOWDPftRUZFxKbAOE-oYIJ9BiIN@jelani.db.elephantsql.com/zejcwtxv",
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  production: {
    client: "postgresql",
    connection: "postgres://zejcwtxv:yAN-BnOWDPftRUZFxKbAOE-oYIJ9BiIN@jelani.db.elephantsql.com/zejcwtxv",
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: ":memory:",
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    useNullAsDefault: true,
  },
};
