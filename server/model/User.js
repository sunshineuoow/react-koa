const UserModel = require('./schema/user')

const User = {
  // 注册
  async signup(user) {
    return await new UserModel(user).save()
  },
  // 根据手机号查找用户
  async findOneByPhone(phone) {
    return UserModel.findOne({phone: phone}).exec()
  }
}

module.exports = User

