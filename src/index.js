import { getNotes, createNote, removeNote, updateNote } from './notes'
import { getFilters, setFilters } from './filters'

// updateNote('1ea01928-d12e-4ea3-b31d-39b41ce3349e', {
//     tittle: 'My note title',
//     body: 'this is the body for my note'
// })
console.log(getFilters())
setFilters({
    searchText: 'Office',
    sortBy: 'byCreated'
})
console.log(getFilters)