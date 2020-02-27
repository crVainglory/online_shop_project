var express = require('express')
var app = express()
var path = require('path')
var mongoose = require('mongoose')
var config = require('config-lite')(__dirname)
var bodyParser = require('body-parser')
var multer = require('multer')
var session = require('express-session')

global.dbHelper = require('./common/dbHelper')

global.db = mongoose.connect(config.mongodb, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true})

app.use(session({
  secret: config.session.secret,
  key: config.session.key,
  cookie: {
    maxAge: config.session.maxAge
  }
}))

// 设定views变量，意为视图存放的目录
app.set('views', path.join(__dirname, 'views'))

// 设定view engine变量， 意为网页模板引擎
// app.set("view engine",'ejs'); ejs:可以直接嵌入变量<%= title %>
app.set('view engine', 'html')
app.engine('.html', require('ejs').__express)

// 设施bodyParser模块，项目中可以直接引用req.body.XXXX
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(multer())

// 设定静态文件目录，比如本地文件
app.use(express.static(path.join(__dirname, 'public')))

// 全局中间件，每个路由处理都会先执行这段代码
app.use(function (req, res, next) {
  res.locals.user = req.session.user
  var err = req.session.error
  res.locals.message = ''
  if (err) res.locals.message = '<div class="alert alert-danger" style="margin-bottom: 20px;color:red;">' + err + '</div>'
  next()
})

// 静态文件的请求放在routes(app)之前加载，这样静态文件你的请求就不会落到业务逻辑里面
require('./routes')(app)

app.get('/', function (req, res) {
  res.render('login')
})

app.listen(config.port)
