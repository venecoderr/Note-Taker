//Libraries
const express = require('express')
const api = require('./routes/index.js')
const path = require('path')

//Server and port
const app = express()
const PORT = process.env.PORT || 3001

//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', api)
app.use(express.static('public'))

//Routes for HTML delivery
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, './public/notes.html'))
)

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, './public/index.html'))
)

//Initializer
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);