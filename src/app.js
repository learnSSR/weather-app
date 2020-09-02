const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'saurabh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'saurabh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'saurabh'
    })
})

app.get('/weather', (req, res) => {
    const space = req.query.search
    console.log(space)
    if (!req.query.search)
    {
        return res.send({
            error:'invalid query'
        })
    }
    geocode( space , (error , {longitude , latitude , location}={}) => {
        if (error)
        {
            return console.log(error)
        } 

        forecast( longitude, latitude, (error, {precip, temp}={}) => {
        if (error)
        {
            return console.log(error)
        }

        // console.log(location)
        // console.log(forecastdata)
        res.send({
        precip,
        temp,
        location,
        address:space
        })
  })

})
   
})

app.get('/product' , (req ,res) => {
    console.log(req.query)
    res.send({
        product:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'saurabh',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'saurabh',
        errorMessage: 'Page not found.'
    })
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is up on port 3000.')
})