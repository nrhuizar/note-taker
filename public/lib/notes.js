const fs = require("fs");
const path = require("path");
const { title } = require("process");

function filterByQuery(query, notesArray) {
    let filteredResults = notesArray;
    if (query.title) {
      if (typeof query.title === 'string') {
        titleArray = [query.title];
      } else {
        titleArray = query.title;
      }
      titleArray.forEach(title => {
        filteredResults = filteredResults.filter(
          note => note.title.indexOf(title) !== -1
        );
      });
    }
    if (query.text) {
      filteredResults = filteredResults.filter(note => note.text === query.text);
    }
    return filteredResults;
}

function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
}

function createNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../../data/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
}

function validateNote(note) {
    if(!note.title || typeof note.title !== 'string') {
        return false;
    }
    if(!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
}

function deleteNote(notesArray) {
    const deleteNote = notesArray["note" + req.params.id];
        delete notesArray["note" + req.params.id];
        res.end( "Deleted note: \n" + JSON.stringify(deleteNote, null, 2));
}

module.exports = {
    filterByQuery,
    findById,
    createNote,
    validateNote,
    deleteNote
};