const Sequelize = require('sequelize')
const db = require('../db')


class User extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        username: { type: DataTypes.STRING(64) },
        email: { type: DataTypes.STRING(120) },
        password: { type: DataTypes.STRING(128) }
      },
      {
        indexes: [ { unique: true, fields: ['username'] }, { unique: true, fields: ['email'] } ],
        tableName: 'users',
        sequelize
      }
    )
  }
}

const UserModel = User.init(db, Sequelize)
UserModel.sync({ force: false })

module.exports = UserModel
