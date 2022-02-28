const fs = require('fs');
const express = require('express');
const path = require('path');

const PORT = process.env.port || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.use(express.static('public'));

function updateDatabase() {
    fs.writeFile('db/db.json', JSON.stringify(notes, '\t'), err => {
            if (err) throw err;
            return true;
    });
};

// Struggled with this for a couple days.  Took ideas from:
// https://github.com/amandalatkins/note-taker/blob/master/routes/routes.js
// in order to complete.
fs.readFile('db/db.json', 'utf8', (err, data) => {

    if(err) throw err;

    let notes = JSON.parse(data);

    app.get('/notes', (req, res) => {
        res.json(JSON.parse(data));
    })

    app.get('/api/notes', (req, res) => {
        //Read db.json, and return notes as JSON
        res.json(notes);
    })

    app.get('*', (req, res) => {
        //catch all reamaining 'get' and go to index.html
        res.sendFile(path.join(__dirname, '/public/index.html'))
    })

    app.post('/api/notes', (req, res) => {
        //save request body, add to db.json, and return to client
        let addNote = req.body;
        notes.push(addNote);
        updateDatabase();
        console.log(`New note added: ${addNote.title}`);
    })

    app.delete('/api/notes/:id', (req, res) => {
        //delete specific id note by reading notes in db.json, 
        //remove the note with id, 
        //and then rewrite the notes to db.json
        notes.splice(req.params.id, 1);
        updateDatabase();
        console.log(`Deleted note ${req.params.id}`)
    })

});

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);