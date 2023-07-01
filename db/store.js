const util = require('util');
const fs = require('fs');

const uuid = require('uuid');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class Store{

    read() {
        return readFile('db/db.json', 'utf8');
    }

    add(note){
        return writeFile('db/db.json', JSON.stringify(note));
    }

    getNotes() {
        return this.read().then((notes) => {
          let parsedNotes;
          try {
            parsedNotes = [].concat(JSON.parse(notes));
          } catch (err) {
            parsedNotes = [];
          }
    
          return parsedNotes;
        });
    }
    addNote(note) {
        const { title, text } = note;

        if (!title || !text) {
            return new Error('Note title and text are required');
        }

        const newNote = {
            title: note.title,
            text: note.text,
            id: uuid.v4()
        };
        return this.getNotes()
        .then((notes) => [...notes, newNote])
        .then((updatedNotes) => this.add(updatedNotes))
        .then(() => newNote);
    }

    removeNote(id) {
        return this.getNotes()
          .then((notes) => notes.filter((note) => note.id !== id))
          .then((filteredNotes) => this.add(filteredNotes));
      }
}
module.exports = new Store();