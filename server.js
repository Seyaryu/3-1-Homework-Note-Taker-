const fs = require('fs');
const express = require('express');
const path = require('path');

const PORT = process.env.port || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.json(JSON.parse(data));
})

app.get('/api/notes', (req, res) => {
    //fix this to read db.json, and return notes as JSON
    res.sendFile(path.join(__dirname, '/db/db.json'));
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.post('/api/notes', (req, res) => {
    //save request body, add to db.json, and return to client
    let addNote = req.body;
    (JSON.parse(data)).push(addNote)
})

app.delete('/api/notes/:id', (req, res) => {
    //delete specific id note by reading notes in db.json, 
    //remove the note with id, 
    //and then rewrite the notes to db.json
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
