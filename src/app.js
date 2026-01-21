const express = require('express')
const path = require('path')
require('dotenv').config({
    path: path.join(__dirname, '../.env')
})
const ejs = require('ejs')
const hbs = require('hbs')
const aqi = require('./utils/aqi/aqi')


const app = express()

//define paths for Express config - sends static html pages
const publicDirectory = path.join(__dirname, '../public')
app.use(express.static(publicDirectory)) //to serve that directory static html (index.html, about.html, help.html, client_side js)
//customise web server

//setting route to deliver handlebar and views location (templates)
app.set('view engine', 'hbs'); //npm handlebars - render dynamic templates
const viewsPath = path.join(__dirname, '../templates/views') //defines path for Express config
app.set('views', viewsPath)

// route
app.get('/', (req, res) => {
    res.render('welcome',{
        name:'Aishwarya'
    })
})

app.get('/aqi', (req, res) => {
    res.render('aqi')
})

app.get('/fetchaqi',(req, res) => {
    const country = req.query.country
    const city = req.query.city
    aqi.aqi(country,city,(err, data) => {
        if(err){
            return res.send({
                error:err
            })
        }
        res.send(data)
    })
})

app.get('/about', (req, res) => { //renders static html page
    res.sendFile(
        path.join(__dirname, '../public/html/about.html')
    )
})

//start server
app.listen(3000, () => { //process of starting server is asynchronous process
    console.log('Server is up on port 3000.')
}) 