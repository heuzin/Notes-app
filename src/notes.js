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

    return id
}

// Remove a note from the list
const removeNote = (id) => {
    const noteIndex = notes.findIndex( (note) => note.id === id)

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
        saveNotes()
    }
}

// Sort your unites by one of three ways
const sortNotes = (sortBy) => {
    if (sortBy === 'byEdited') {
        return notes.sort((a, b) => {
            if (a.updatedAt > b.updatedAt) {
                return -1
            } else if (a.updatedAt < b.updatedAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byCreated') {
        return notes.sort ((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1
            } else if (a.createdAt < b.createdAt) {
                return 1
            }
        })
    } else if (sortBy === 'alphabetical'){
        return notes.sort((a, b) => {
            if (a.tittle.toLowerCase() < b.tittle.toLowerCase()) {
                return -1
            } else if (a.tittle.toLowerCase() > b.tittle.toLowerCase()) {
                return 1
            } else {
                return 0
            }
        })
    } else {
        return notes
    }
}

const updateNote = (id, updates) => {
    const note = notes.find((note) => note.id === id)

    if (!note) {
        return
    }

    if (typeof updates.tittle === 'string'){
        note.tittle = updates.tittle
        note.updatedAt = moment().valueOf()
    }

    if (typeof updates.body === 'string'){
        note.body = updates.body
        note.updatedAt = moment().valueOf()
    }

    saveNotes()
    return note
}

notes = loadNotes()

export { getNotes, createNote, removeNote, sortNotes, updateNote }