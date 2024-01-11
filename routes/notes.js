const app = require('express').Router();
const { json } = require('express');
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');

// GET Route for retrieving all the notes
app.get('/', async (req, res) => {
  fs.readFile('./db/db.json', 'utf-8', (error, data) => error ? console.error(error) : res.json(JSON.parse(data)))
});

// POST Route for a new note
app.post('/', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body
  
  fs.readFile('./db/db.json', 'utf8', (error, data) => {
    if(error){
        console.error(error)
    }else if (req.body) {
        const newNote = {
          title,
          text,
          note_id: uuidv4(),
        };
        const parsedData = JSON.parse(data);
        parsedData.push(newNote);
        fs.writeFile('./db/db.json', JSON.stringify(parsedData), (error, data) => error ? console.error(error) : res.json(JSON.parse(newNote)))
    }else{
        res.json('send valid request')
    }
  })
});

module.exports = app