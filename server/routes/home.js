const home = (router) => {
  router.get('/h5/index', async (ctx, next) => {
    let title = 'koa-demo'
    await ctx.render('home/index', {
      title
    })
  })
}

module.exports = home
