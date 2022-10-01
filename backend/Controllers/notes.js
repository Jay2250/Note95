const { StatusCodes } = require('http-status-codes');
const Note = require('./../Models/Notes')

const getAllNotes = async (req, res) => {
    const notes = await (Note.find({ createdBy: req.user.userId })).sort('createdAt');
    res.status(StatusCodes.OK).json({ notes, count: notes.length });
}

const getAllSchoolNotes = async (req, res) => {
    let tag = req.params.key;
    if (tag == 'school') {
        tag = '⚡ School'
    } else if (tag == 'money') {
        tag = '🌿 Money'
    } else {
        tag = '🔥 Others'
    }

    const notes = await Note.find({
        createdBy: req.user.userId,
        tag: tag
    })
    res.status(StatusCodes.OK).json({ notes, count: notes.length });
}
const getNote = async (req, res) => {
    const noteId = req.params.id;
    const userId = req.user.userId;
    const note = await Note.findOne({
        _id: noteId,
        createdBy: userId
    })
    if (!note) {
        res.status(StatusCodes.NOT_FOUND).json({ msg: `No note found with this id ${noteId}` });
        return;
    }
    res.status(StatusCodes.OK).json({ note });
}

const createNote = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const note = await Note.create(req.body);
    res.status(StatusCodes.CREATED).json(note);
}

const updateNote = async (req, res) => {
    const noteId = req.params.id;
    const userId = req.user.userId;

    const { note } = req.body;

    if (note === "") {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: `Bad Request !` });
        return;
    }
    const newNote = await Note.findByIdAndUpdate(
        {
            _id: noteId,
            createdBy: userId
        },
        req.body,
        {
            new: true,
            runValidators: true
        }
    )
    if (!newNote) {
        res.status(StatusCodes.NOT_FOUND).json({ msg: `No note found with this id ${noteId}` });
        return;
    }
    res.status(StatusCodes.OK).json({ newNote });
}

const deleteNote = async (req, res) => {
    const noteId = req.params.id;
    const userId = req.user.userId;

    const note = await Note.findOneAndDelete(
        {
            _id: noteId,
            createdBy: userId
        }
    )

    if (!note) {
        res.status(StatusCodes.NOT_FOUND).json({ msg: `No note found with this id ${noteId}` });
        return;
    }

    res.status(StatusCodes.OK).json({ msg: 'Deleted Successfully !' });
}

module.exports = {
    getAllNotes,
    createNote,
    updateNote,
    deleteNote,
    getNote,
    getAllSchoolNotes
}