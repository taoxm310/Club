const path = require('path')
module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAEM || 'club',
    user: process.env.DB_USER || 'club',
    password: process.env.DB_PASS || 'club',
    options: {
      dialect: process.env.DB_DIALECT || 'sqlite',
      host: process.env.HOST || '104.224.148.121',
      storage: path.resolve(__dirname, '../../club.sqlite'),
      operatorsAliases: false
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
}
