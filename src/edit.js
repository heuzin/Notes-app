import { initializeEditPage, generateLastEdited } from './views'
import { updateNote, removeNote } from './notes'

const tittleElement = document.querySelector('#note-tittle')
const bodyElement = document.querySelector('#note-body')
const removeElement = document.querySelector('#remove-note')
const dateElement = document.querySelector('#last-edited')
const noteId = location.hash.substring(1)

initializeEditPage(noteId)

tittleElement.addEventListener('input', (e) => {
    const note = updateNote(noteId, {
        tittle: e.target.value
    })
    dateElement.textContent = generateLastEdited(note.updatedAt)
})

bodyElement.addEventListener('input', (e) => {
    const note = updateNote(noteId, {
        body: e.target.value
    })
    dateElement.textContent = generateLastEdited(note.updatedAt)
})

removeElement.addEventListener('click', (e) => {
    removeNote(noteId)
    location.assign('/index.html')
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        initializeEditPage(noteId)
    }
})