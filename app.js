import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'
import indexRouter from './server/app/routes/index'
import dbConnect from './server/app/helper/mongodb'

const app = express()

dbConnect()

app.set('JWTSecretKey', process.env.JWT_SECRET);
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/', indexRouter)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// app.use(bodyParser())

const server = app.listen(process.env.PORT, process.env.HOSTNAME, function () {
  console.log('App listening at http://%s:%s', server.address().address, server.address().port)
})

export default app
