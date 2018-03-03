const home = require('./home')

const initRouter = Router => {
  const router = new Router()

  home(router)

  return router.routes()
}

module.exports = initRouter
