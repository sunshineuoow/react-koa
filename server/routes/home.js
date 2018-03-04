const home = (router) => {
  router.get('/', async (ctx, next) => {
    let title = 'koa-demo'
    await ctx.render('home/index', {
      title
    })
  })

  router.post('/api/register', async (ctx, next) => {
    console.log(ctx.request.body)
  })
}

module.exports = home
