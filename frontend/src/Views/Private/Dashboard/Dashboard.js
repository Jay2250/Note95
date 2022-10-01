import React, { useState } from 'react'
// import { ThemeProvider , original } from 'react95';
import { ThemeProvider } from 'styled-components';
import tokyoDark from 'react95/dist/themes/tokyoDark';
import Navbar from './Navbar';
import { Bar, Fieldset, List, ListItem, Select } from 'react95';
import Note from '../../../Components/Note';
import CustomModal from '../../../Components/CustomModal';
import CreateNote from '../../../Components/CreateNote';
import { Requests } from './../../../Api/Requests';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Dashboard() {
    const [open, setOpen] = useState(false);
    const style = {
        'marginTop': '60px',
        'position': 'fixed',
        'zIndex': '997'
    }
    const [showCreateNote, setShowCreateNote] = useState(false);
    const [notes, setNotes] = useState([]);
    const [notesCount, setNotesCount] = useState(0);
    const [showFilter, setShowFilter] = useState(false);
    const [tag, setTag] = useState("🔥 Others");
    const [text, setText] = useState('All notes');
    const [userName, setUserName] = useState('name');
    const loaction = useLocation();
    const getAllNotes = async () => {
        await Requests.getAllNotes()
            .then((res) => {
                console.log(res.data);
                setNotes(res.data.notes);
                setNotesCount(res.data.count);
            })
            .catch((err) => {
                console.error(err);
            })
        setText("All notes")
    }

    const filterNotes = async (tag) => {
        await Requests.filterNotes(tag)
            .then((res) => {
                if (res.status == 200) {
                    setNotes(res.data.notes);
                    if (res.data.count == 0) {
                        setText('');
                    }
                    setShowFilter(false);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const onChange = async (evt, nextSelection) => {
        setTag(nextSelection.label);
        if (nextSelection.value == 1) {
            filterNotes('school');
            setText('School related Notes');
        } else if (nextSelection.value == 2) {
            filterNotes('money');
            setText('Money related Notes');
        } else {
            filterNotes('others');
            setText('Other Notes');
        }
    }
    const options = [
        { value: 1, label: '⚡ School' },
        { value: 2, label: '🌿 Money' },
        { value: 4, label: '🔥 Others' }
    ];

    useEffect(() => {
        const name = loaction.state.name;
        setUserName(name);
        getAllNotes();
    }, []);

    return (
        <>
            <div className="d-flex flex-column" >
                <ThemeProvider theme={tokyoDark}>
                    <Navbar addNote={() => setShowCreateNote(true)} userName={userName} />
                </ThemeProvider>
                <div className="ms-3" style={style}>
                    <List inline>
                        <ListItem square disabled>
                            <span role='img' aria-label='🌿'>
                                🌿
                            </span>
                        </ListItem>
                        <Bar size={38} />
                        <ListItem primary onClick={() => { getAllNotes() }}>All</ListItem>
                        <ListItem disabled>Pinned</ListItem>
                        <ListItem onClick={() => { setShowFilter(!showFilter) }}>Filter</ListItem>
                        <ListItem onClick={() => { setShowCreateNote(true) }}>Create Note</ListItem>
                    </List>
                </div>
                <div className='row' style={{ 'marginTop': '115px' }}>
                    <div className="text-center">
                        <Fieldset>
                            <h1 className='display-5'>{text}</h1>
                        </Fieldset>
                    </div>
                    {
                        notes.map((data, index) => {
                            return (
                                <div key={index} className="mt-2 col-xs-1 col-lg-2 col-sm-4 col-md-3 d-flex align-items-center justify-content-center" >
                                    <Note data={data} reloadData={getAllNotes} />
                                </div>
                            )
                        })
                    }

                    {
                        notes.length == 0 && (
                            <>
                                <p className='text-center text-warning display-4 '>Notes created will apear here !</p>
                            </>
                        )
                    }
                </div>
            </div>


            <CustomModal
                show={showCreateNote}
                setShow={setShowCreateNote}
                onClose={() => { setShowCreateNote(false) }}
                content={
                    <CreateNote
                        onClose={() => { setShowCreateNote(false) }}
                        reloadData={getAllNotes}
                    />
                }
            />


            {showFilter && (
                <List
                    style={{
                        position: 'absolute',
                        left: '10%',
                        top: '10%',
                        marginTop: '10px'

                    }}
                    onClick={() => setOpen(false)}
                >
                    <ListItem>
                        {/* <span role='img' aria-label='👨‍💻'>
                            👨‍💻
                        </span>
                        Profile */}
                        <Select
                            defaultValue={1}
                            options={options}
                            menuMaxHeight={160}
                            onChange={onChange}
                            className="w-100"
                        />
                    </ListItem>
                </List>
            )}
        </>
    )
}