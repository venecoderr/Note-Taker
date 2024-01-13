const app = require('express').Router()
const { body } = require('express-validator')
const fsHelper = require('../helpers/fsUtils')
const { v4: uuidv4 } = require('uuid')
const db = './db/notes.json'

// GET Route for retrieving all the notes
app.get('/', (req, res) => {
  fsHelper.readFromFile(db)
  .then((data) => res.json(JSON.parse(data)))
})

// POST Route for a new note
app.post('/',
  body('title', 'invalid note title').isString().notEmpty(), 
  body('text', 'invalid note').isString().notEmpty(), 
  (req, res) => {
  const { title, text } = req.body
  const newNote = {
    title,
    text,
    id: uuidv4(),
  }
  
  fsHelper.readAndAppend(newNote, db)
  res.json(`New note saved ${newNote}`)

})

app.delete('/:id', (req, res) => {
  fsHelper.readFromFile(db, 'utf-8')
  .then((data) => {
    const parsedData = JSON.parse(data)
    for(let i = 0; i < parsedData.length; i++){
      if(parsedData[i].id === req.params.id){
        parsedData.splice(i, 1)
      }
    }
    fsHelper.writeToFile(db, parsedData)
  })
  res.json('deleted')
})

module.exports = app