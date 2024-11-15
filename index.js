const express = require('express')
const mongoose = require('mongoose')
const ApiRoute = require('./routes')
const {MONGO_URI} = require('./database/db')
const { jsonResponseMiddleware } = require('./middlewares/json-response.middleware')
const cors = require('cors')

const app = express()

mongoose.connect(MONGO_URI).then(()=> {
    console.log('✅ Connected on MongoDB')
})

app.use(express.json())
app.use(cors())
app.use(jsonResponseMiddleware)

app.use('/api', ApiRoute)


app.listen(3000, () => {
    console.log('✅ Server is running on port 3000')
})
