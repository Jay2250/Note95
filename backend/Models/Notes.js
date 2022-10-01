const mongoose = require('mongoose');

const NotesSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide note title'],
            maxlength: 200,
        },
        note: {
            type: String,
            required: [true, 'Please provide note'],
            maxlength: 500,
        },
        tag: {
            type: String,
            enum: ['⚡ School', '🌿 Money', '🔥 Others'],
            default: '🔥 Others',
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please provide user id'],
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Note', NotesSchema)