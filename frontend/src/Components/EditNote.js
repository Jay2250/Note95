import moment from 'moment';
import React, { useState } from 'react'
import { Window, WindowContent, WindowHeader, TextField, Toolbar, Button, Bar ,Select} from 'react95';
import { Requests } from '../Api/Requests';
export default function EditNote(props) {
    const setHeight = (e) => {
        e.target.style.height = 'inherit';
        e.target.style.height = `${Math.min(e.target.scrollHeight, 300)}px`;
    }
    const [note, setNote] = useState(props.data.note);
    const [title, setTitle] = useState(props.data.title);
    const [tag, setTag] = useState(props.data.tag);
    const [edit, setEdit] = useState(false);
    const [error, setError] = useState('');
    const handleChange = (e) => {
        setHeight(e);
        setNote(e.target.value);
    }

    const saveNote = () => {
        if (note != '') {
            setError('');
            Requests.updateNote(props.data._id, { note, title , tag })
                .then((res) => {
                    console.log(res.data.newNote);
                    if (res.status === 200) {
                        props.onClose();
                        props.reloadData();
                        setEdit(false);
                    }
                })
                .catch((err) => {
                    console.error(err);
                })
        } else {
            setError("Only blank spaces not allowed !!");
        }
    }

    const handleDelete = () => {
        Requests.deleteNote(props.data._id)
            .then((res) => {
                console.log(res.data);
                if (res.status == 200) {
                    props.onClose();
                    props.reloadData();
                }
            })
            .catch((err) => {
                console.error(err);
            })
    }

    const options = [
        { value: 1, label: '⚡ School' },
        { value: 2, label: '🌿 Money' },
        { value: 4, label: '🔥 Others' }
    ];
    const getDefaultValue = () => {
        let defValue = options.find((elem) => {
            return elem.label == props.data.tag;
        })
        return defValue.value;
    }
    const onChange = (evt, nextSelection) => {
        // console.log(nextSelection);
        setTag(nextSelection.label);
    }
    const formatDate = (date) => {
        return moment(date).format('DD MMM YYYY hh:mm')
    }
    return (
        <>
            <Window className='window m-4' style={{ 'width': '450px' }}>
                <WindowHeader className='window-header d-flex align-items-center justify-content-between'>
                    <span>Edit_Note.exe</span>
                    <Button onClick={() => { props.onClose(); setEdit(false) }}>
                        <span className='close-icon' >X</span>
                    </Button>
                </WindowHeader>
                <Toolbar>
                    <Button variant='menu' size='sm' onClick={() => { saveNote() }}>
                        Save
                    </Button>
                    <Button variant='menu' size='sm' onClick={() => { setEdit(true) }}>
                        Edit
                    </Button>
                    <Bar size={'20px'} />
                    <Button variant='menu' size='sm' onClick={handleDelete} >
                        <span className='text-danger'>
                            Delete
                        </span>
                    </Button>
                </Toolbar>
                <WindowContent>
                    <div className='p-3'>
                        <div className="">
                            <p>Note created on : <span className='ms-1 fw-bold'>{formatDate(props.data.createdAt)}</span></p>
                            <p>Last updated on : <span className='ms-1 fw-bold'>{formatDate(props.data.updatedAt)}</span></p>
                        </div>
                        {edit && (
                            <>
                                <div className='mt-3'>Title:</div>
                                <TextField
                                    placeholder={props.data.title}
                                    onChange={(e) => { setTitle(e.target.value) }}
                                    fullWidth
                                    multiline
                                    disabled={!edit}
                                    rows={2}
                                    value={title}
                                />

                                <div className="mt-3">
                                    Select Tag:
                                    <Select
                                        defaultValue={getDefaultValue}
                                        options={options}
                                        menuMaxHeight={160}
                                        onChange={onChange}
                                        className="w-100"
                                    />
                                </div>
                                <div className="mt-3 text-primary">
                                    <TextField
                                        placeholder={`${props.data.note}`}
                                        onChange={(e) => { handleChange(e) }}
                                        fullWidth
                                        multiline
                                        disabled={!edit}
                                        rows={4}
                                        value={note}
                                    />
                                </div>
                                <div className='d-flex align-items-center justify-content-center mt-3'>
                                    <Button primary fullWidth onClick={saveNote}>Save Note</Button>
                                </div>
                            </>
                        )}

                        {!edit && (
                            <>
                                <div className='mt-3 fw-bold'>Title:</div>
                                <p>{props.data.title}</p>
                                <div className='mt-3 fw-bold'>Note:</div>
                                <p>{props.data.note}</p>
                                <div className='mt-3 fw-bold'>Tag:</div>
                                <p>{props.data.tag}</p>
                            </>
                        )}
                    </div>

                    <div className="text-danger text-center">
                        <p>{error}</p>
                    </div>
                </WindowContent>
            </Window>
        </>
    )
}
