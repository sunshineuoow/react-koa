const config = require('../../config')

module.exports = function tokenCheck() {
  const middleware = async function (ctx, next) {
    let flag = false
    config.white_path.forEach(item => {if (item.test(ctx.url)) flag = true})
    if (ctx.state.user || flag) {
      return next()
    } else {
      ctx.body = {r: false, msg: '会话已过期，请重新登录', code: 4}
    }
  }

  return middleware
}
