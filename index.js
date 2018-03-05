const Koa = require('koa')
const views = require('koa-views')
const Router = require('koa-router')
const path = require('path')
const initRouter = require('./server/routes')
const server = require('koa-static')
const bodyParser = require('koa-bodyparser')
const mongoose = require('mongoose')
const app = new Koa()

const db = 'mongodb://localhost/test'

mongoose.connect(db)


app.use(views(path.join(__dirname, './src'), {
  extension: 'pug'
}))

app.use(bodyParser())


app.use(server(path.join(__dirname, './static')))

app.use(initRouter(Router))

app.listen(3000)
