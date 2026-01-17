const express = require('express')
const path = require('path')
const ejs = require('ejs')
const hbs = require('hbs')
//const aqi = require('./utils/aqi/aqi')

const app = express()


// view engine
const htmlPath = path.join(__dirname,'../templates/views/html')
app.set('views', htmlPath)
app.engine('html', ejs.renderFile)
app.set('view engine', 'html')

//setting route to deliver handlebar and views location (templates)
app.set('view engine', 'hbs'); //npm handlebars - render dynamic templates
const viewsPath = path.join(__dirname, '../templates/views/hbs') //defines path for Express config
app.set('views', viewsPath)

// route
app.get('/', (req, res) => {
    res.render('welcome')
})

app.get('/aqi',(req,res) => {
    res.render('aqi')
})


//start server
app.listen(3000, () => { //process of starting server is asynchronous process
    console.log('Server is up on port 3000.')
}) 