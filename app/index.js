const path = require('path')
const Koa = require('koa')
const koaStatic = require('koa-static')
const koaBody = require('koa-body')
const error = require('koa-json-error')
const cors = require('koa2-cors')
const mongoose = require('mongoose')
const routeList = require('./routes')
const responseSuccess = require('./middlewares/respone-success')
const parameter = require('./middlewares/parameter')

const port = process.env.PORT || 9004

// 连接数据库
mongoose.connect('mongodb://localhost/zblog', () => {
  console.log('连接成功')
})
mongoose.connection.on('error', err => {
  console.log('数据库连接失败，error：', err)
})

const app = new Koa()

app.use(
  cors({
    origin: '*'
  })
)

// 静态文件中间件
app.use(koaStatic(path.join(__dirname, 'public/')))

// 错误响应格式化中间件
app.use(
  error({
    postFormat: (e, { stack, name, message: msg, ...rest }) =>
      process.env.NODE_ENV === 'production'
        ? { data: null, msg, ...rest }
        : { stack, name, data: null, msg, ...rest }
  })
)

// 成功响应格式化中间件
app.use(
  responseSuccess(app, {
    status: 200,
    msg: '成功'
  })
)

// param参数检验中间件
app.use(parameter(app))

// 控制文件上传中间件
app.use(
  koaBody({
    multipart: true, // 支持文件上传
    formidable: {
      maxFileSize: 200 * 1024,
      uploadDir: path.join(__dirname, 'public/upload/'), // 设置文件上传目录
      keepExtensions: true // 保持文件的后缀
    }
  })
)

// 挂载路由
routeList(app)

app.listen(port, () => {
  console.log(`The Server is Run in Port ${port}`)
})
