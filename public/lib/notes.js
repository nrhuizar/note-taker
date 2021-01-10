const fs = require("fs");
const path = require("path");

function createNote(body, notesArray) {
    const note = body;
    notes.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../../data/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
}

module.exports = {
    createNote
};