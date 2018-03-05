const home = (router) => {
  router.get('/', async (ctx, next) => {
    let title = 'koa-demo'
    await ctx.render('home/index', {
      title
    })
  })
}

module.exports = home
