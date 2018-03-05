const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  phone: {unique: true, type: String},
  nickname: String,
  email: String,
  password: String,
  meta: {
    createAt: {type: Date, default: Date.now()},
    updateAt: {type: Date, default: Date.now()}
  }
})

const User = mongoose.model('User', UserSchema)

module.exports = User
