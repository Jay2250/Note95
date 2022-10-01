import React, { useState } from 'react'
import { Window, WindowContent, WindowHeader, TextField, Toolbar, Button, Bar, Select } from 'react95';
import { Requests } from '../Api/Requests';
export default function CreateNote(props) {
    const [note, setNote] = useState('');
    const [title, setTitle] = useState('');
    const [tag, setTag] = useState("🔥 Others");
    const [error, setError] = useState('');
    const setHeight = (e) => {
        e.target.style.height = 'inherit';
        e.target.style.height = `${Math.min(e.target.scrollHeight, 300)}px`;
    }

    const handleChange = (e) => {
        setHeight(e);
        setNote(e.target.value);
    }

    const handleClick = async () => {
        if (note != '') {
            await Requests.createNote({ 'note': note, 'title': title, 'tag': tag })
                .then((res) => {
                    console.log(res.data);
                    if (res.status == 201) {
                        props.onClose();
                        props.reloadData();
                        setNote('');
                        setTitle('');
                        setTag('🔥 Others');
                        setError('');
                    }
                })
                .catch((err) => {
                    console.error(err);
                })
        } else {
            setError('Note can not be empty !!');
        }
    }

    const onChange = (evt, nextSelection) => {
        // console.log(nextSelection);
        setTag(nextSelection.label);
    }
    const options = [
        { value: 1, label: '⚡ School' },
        { value: 2, label: '🌿 Money' },
        { value: 4, label: '🔥 Others' }
    ];
    return (
        <>
            <Window className='window m-4' style={{ 'width': '450px' }}>
                <WindowHeader className='window-header d-flex align-items-center justify-content-between'>
                    <span>Create_Note.exe</span>
                    <Button onClick={props.onClose}>
                        <span className='close-icon' >X</span>
                    </Button>
                </WindowHeader>
                <Toolbar>
                    <Button variant='menu' size='sm'>
                        Save
                    </Button>
                    <Bar size={'20px'} />
                    <Button variant='menu' size='sm' disabled >
                        Delete
                    </Button>
                </Toolbar>
                <WindowContent>
                    <div className='p-3'>
                        <div>Enter title:</div>
                        <TextField
                            placeholder='Headeline...'
                            onChange={(e) => { setTitle(e.target.value) }}
                            fullWidth
                            multiline
                            rows={2}
                        />

                        <div className="mt-3">
                            Select Tag:
                            <Select
                                defaultValue={1}
                                options={options}
                                menuMaxHeight={160}
                                onChange={onChange}
                                className="w-100"
                            />
                        </div>

                        <div className="mt-3">
                            <TextField
                                placeholder='Note...'
                                onChange={(e) => { handleChange(e) }}
                                fullWidth
                                multiline
                                rows={4}
                                value={note}
                            />
                        </div>
                        <div className='d-flex align-items-center justify-content-center mt-3'>
                            <Button primary fullWidth onClick={handleClick}>Create Note</Button>
                        </div>
                    </div>
                    <div className="text-danger text-center">
                        <p>{error}</p>
                    </div>
                </WindowContent>
            </Window>
        </>
    )
}
