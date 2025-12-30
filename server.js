const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const userRouter = require('./src/routers/userRouter')
const app = express()
const port = 5000



app.use(express.json())
app.use('/', userRouter)

app.listen(port, () => {
  console.log(`Listening at port ${port}`)
})
