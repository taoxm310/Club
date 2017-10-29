module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAEM || 'club',
    user: process.env.DB_USER || 'club',
    password: process.env.DB_PASS || 'club',
    options: {
      dialect: process.env.DB_DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: './club.sqlite',
      operatorsAliases: false
    }
  }
}
