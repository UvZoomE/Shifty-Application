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
    connection: process.env.DATABASE_URL
  }

};
