const Joi = require('joi')
const express = require('express')

const categories = require('./routes/categories')
const home = require('./routes/home')
// const mongoose = require('mongoose')

const app = express()

app.use(express.json())
app.use('/api/categories', categories)
app.use('/', home)


// mongoose.connect('mongodb://localhost/playground', {useNewUrlParser: true} )
//     .then(console.log('connected to mongoose...'))
//     .catch(err => console.error('could not connect to mongodb...', err))



const port = process.env.PORT || 3000

app.listen(port)