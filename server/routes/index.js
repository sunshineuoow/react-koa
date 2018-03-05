const home = require('./home')
const account = require('./account')

const initRouter = Router => {
  const router = new Router()

  home(router)
  account(router)

  return router.routes()
}

module.exports = initRouter
