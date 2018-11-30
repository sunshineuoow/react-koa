const Sequelize = require('sequelize')
const config = require('./config')


// TODO: get the sql url from process.env
const db = new Sequelize(config.DATABASE, config.USERNAME, config.PASSWORD, {
  host: config.HOST,
  port: config.PORT,
  dialect: 'mysql'
})

module.exports = db
