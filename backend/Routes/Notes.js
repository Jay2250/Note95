const express = require('express');
const router = express.Router();

const { getAllNotes, createNote, deleteNote, updateNote, getNote ,getAllSchoolNotes } = require('./../Controllers/notes');

router.route('/').get(getAllNotes).post(createNote);
router.route('/filter/:key').get(getAllSchoolNotes);
router.route('/:id').get(getNote).delete(deleteNote).patch(updateNote);

module.exports = router