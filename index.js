const express = require('express')
const app = express()
const path = require('path')

const indexRouter = require('./routes/index')
const userRouter = require('./routes/users')

// 存放模板引擎的目录
app.set('views', path.join(__dirname, 'views'))
// 设置模板引擎为 ejs
app.set('view engine', 'ejs')



app.use('/', indexRouter)
app.use('/users', userRouter)


app.listen(3000)