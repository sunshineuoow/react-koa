require('../model/user')
const mongoose = require('mongoose')
const User = mongoose.model('User')


const account = (router) => {
  router.post('/api/register', async (ctx, next) => {
    let data = ctx.request.body
    let user = await User.findOne({phone: data.phone}).exec()

    if (!user) {
      user = new User({...data})
    }

    try {
      user.save()
      ctx.body = {success: true}
    } catch (e) {
      ctx.body = {success: false}
    }

  })
}

module.exports = account
