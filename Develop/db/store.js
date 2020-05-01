const util = require('util')
const fs = require('fs')

const  { v1: uuidv1 } = require('uuid');

const readFileAsync = util.promisify(fs.readFile)

const writeFileAsync = util.promisify(fs.writeFile)

class Store {
    read() {
        return readFileAsync("./db/db.json", "utf8")
    }

    write(note) {
        return writeFileAsync ("./db/db.json", JSON.stringify(note))
    }
    
    getNotes() {
      return this.read().then(notes => {
        
            console.log(notes);
            //parse json string and turn into an object
            var parseNotes = JSON.parse(notes)
            //add them to a list

            //return that list (array)
            var notesArray = [];
            notesArray = notesArray.concat(parseNotes);
            return notesArray;
        })
    }

    addNotes(note) {
        //use the note argument

        // create a new note object with your required fields (text, title, id)
        var newNote = {
            text: note.text,
            title: note.title,
            id: uuidv1()
        }
        console.log(newNote);
        //write that object to the json file
       return this.getNotes().then(allNotes=>[...allNotes, newNote])
        .then(combinedNotes=> this.write(combinedNotes))
        .then(()=>newNote);
    }

    removeNotes(id) {
        //get all notes
      return this.getNotes().then(allNotes=> allNotes.filter(note=> note.id !==id))
        .then(remainingNotes=> this.write(remainingNotes));
        //remove the note with the given id
        //and return a list of notes that does NOT have that id (in essence the filtered list)
        
    }

}

module.exports = new Store()