import React from 'react'
import { useState } from 'react';
import { Button, Fieldset, TextField } from 'react95';
export default function LocalNote(props) {
    const [editedContent, setEditedContent] = useState('');
    const handleChange = (e) => {
        setEditedContent(e.target.value)
    }
    return (
        <>
            <div>
                <Fieldset>
                    <div className="d-flex align-items-center justify-content-between">
                        <TextField
                            placeholder={props.note}
                            onChange={(e) => { handleChange(e) }}
                            multiline
                            rows={3}
                            value={editedContent}
                            className='w-50'
                        />
                        <div className="">
                            <Button onClick={() => { props.edit(props.id, editedContent) }}>
                                <span className='text-success'>edit</span>
                            </Button>
                            <Button className='ms-1' onClick={() => { props.onDeleteClick(props.id) }}>
                                <span className='text-danger'>Delete</span>
                            </Button>
                        </div>
                    </div>
                </Fieldset>
            </div>
        </>
    )
}