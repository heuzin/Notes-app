import uuidv4 from 'uuid/v4'
import moment from 'moment'

let notes = []

// Read existing notes fom localStorage
const loadNotes =  () => {
    // Check for existing saved data READ - CHEACK - PARSE
    const notesJSON = localStorage.getItem('notes')

    try {
        return notesJSON !== null ? JSON.parse(notesJSON) : []
    } catch(e) {
        return []
    }
}

// Save the notes to localStorage
const saveNotes = () => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

// Expose notes from module
const getNotes = () => notes

const createNote = () => {
    const id = uuidv4()
    const timestamp = moment().valueOf()

    notes.push({
        id: id,
        tittle: '',
        body: '',
        createdAt: timestamp,
        updatedAt: timestamp
    })
    saveNotes()
}

notes = loadNotes()

export { getNotes, createNote }