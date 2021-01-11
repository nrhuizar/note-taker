const { filterByQuery, findById, createNote, validateNote, deleteNote } = require('../../lib/notes');
const { notes } = require('../../../data/db.json');
const router = require('express').Router();
const fs = require("fs");

router.get('/notes', (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

// find notes
router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

// add a note
router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();

    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        const note = createNote(req.body, notes);
        res.json(note);
    }
});

// delete a note
router.delete('/notes/:id', (req, res) => {
    const { id } = deleteNote;
    const noteIndex = notes.filter(note => note.id == id);
    notes.splice(noteIndex, 1);
    return res.send("Success");
})

module.exports = router;