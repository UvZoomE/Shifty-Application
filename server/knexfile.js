// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

export default{

  development: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      port: 5432,
      user: "postgres",
      password: "docker",
      database: "shifty"
    }
  },

  production: {
    client: 'pg',
    connection: {
      host: process.env.DB_CONTAINER,
      port: process.env.DB_PORT || 5432,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB
    }
  }

};
