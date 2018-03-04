const Koa = require('koa')
const views = require('koa-views')
const Router = require('koa-router')
const path = require('path')
const initRouter = require('./server/routes')
const server = require('koa-static')
const bodyParset = require('koa-bodyparser')
const app = new Koa()

app.use(views(path.join(__dirname, './src'), {
  extension: 'pug'
}))

app.use(bodyParset())


app.use(server(path.join(__dirname, './static')))

app.use(initRouter(Router))

app.listen(3000)
