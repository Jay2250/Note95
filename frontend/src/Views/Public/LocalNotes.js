import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Button, Fieldset, TextField } from 'react95';
import LocalNote from '../../Components/LocalNote';

export default function LocalNotes() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState('content');
    const [showAddNote, setShowAddNote] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const createNote = () => {
        const notes = JSON.parse(localStorage.getItem('notes') || "[]");
        const noteObj = {
            id: Math.floor(Math.random() * 100000),
            content: content
        }
        notes.push(noteObj);
        localStorage.setItem('notes', JSON.stringify(notes));
        setNotes(notes);
        setShowAddNote(false);
        setContent('');
    }

    useEffect(() => {
        const notes = JSON.parse(localStorage.getItem('notes') || "[]");
        setNotes(notes);
    }, [])

    const edit = (id, edit) => {
        const notes = JSON.parse(localStorage.getItem('notes') || "[]");
        const targetNote = notes.filter((note) => note.id == id)[0];
        targetNote.content = edit;
        localStorage.setItem('notes', JSON.stringify(notes));
        setNotes(notes);
    }

    const onDeleteClick = (id) => {
        const notes = JSON.parse(localStorage.getItem('notes') || "[]");
        const newNotes = notes.filter((note) => note.id != id);
        localStorage.setItem('notes', JSON.stringify(newNotes));
        setNotes(newNotes);
    }
    return (
        <>
            <div className="container">
                <div className="text-center">
                    <Fieldset>
                        <p className='display-5'>Notes</p>
                        <div className="d-flex justify-content-right align-items-center">
                            <div className="m-3">
                                <Button onClick={() => { setShowAddNote(!showAddNote) }}>
                                    Create Note
                                </Button>
                            </div>
                        </div>
                        {
                            showAddNote && (
                                <Fieldset>
                                    <div className="mt-3">
                                        <TextField
                                            placeholder='Note...'
                                            onChange={(e) => { setContent(e.target.value) }}
                                            multiline
                                            rows={3}
                                            value={content}
                                        />
                                        <div className="m-3">
                                            <Button onClick={() => { createNote() }}>
                                                Add Note
                                            </Button>
                                        </div>
                                    </div>
                                </Fieldset>
                            )
                        }
                        {
                            notes.map((elem) => {
                                return (
                                    <div id={elem.id} className="">
                                        <LocalNote
                                            note={elem.content} edit={edit}
                                            id={elem.id} onDeleteClick={onDeleteClick} showEdit={showEdit} setShowEdit={setShowEdit} content={content} setContent={setContent}
                                        />
                                    </div>
                                )
                            })
                        }
                    </Fieldset>

                </div>
            </div>
        </>
    )
}