const Koa = require('koa')
const views = require('koa-views')
const Router = require('koa-router')
const path = require('path')
const initRouter = require('./routes')
const server = require('koa-static')
const bodyParser = require('koa-bodyparser')
const mongoose = require('mongoose')
const koaJwt = require('koa-jwt')
const config = require('./config')
const {getToken} = require('./utils/token')
const tokenCheck = require('./middleware/token')
const app = new Koa()

const db = 'mongodb://localhost/test'

mongoose.connect(db)


app.use(views(path.join(__dirname, './views'), {
  extension: 'pug'
}))

app.use(bodyParser())

app.use(server(path.join(__dirname, '../static')))

app.use(koaJwt({secret: config.secret, getToken, passthrough: true}).unless({path: config.white_path}))

app.use(tokenCheck())

app.use(initRouter(Router))

app.listen(6000)
