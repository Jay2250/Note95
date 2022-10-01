import moment from 'moment';
import React, { useState } from 'react'
import { Window, WindowContent, Fieldset } from 'react95';
import { Requests } from '../Api/Requests';
import CustomModal from './CustomModal';
import EditNote from './EditNote';

export default function Note(props) {
    const [showEditNote, setShowEditNote] = useState(false);
    const [noteData, setNoteData] = useState({});
    const getNoteById = async (id) => {
        setShowEditNote(true);
        await Requests.getNoteById(id)
            .then((res) => {
                console.log(res.data.note);
                setNoteData(res.data.note);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    const formatDate = (date) => {
        return moment(date).format('DD MMM YYYY ');
    }
    const getTime = (date) => {
        return moment(date).format('hh:mm A');
    }
    return (
        <>
            <div onClick={() => { getNoteById(props.data._id) }}>
                <Window>
                    <WindowContent>
                        <Fieldset>
                            <p className='fw-bold'>
                                {props.data.title}
                            </p>
                            <p>{props.data.note.slice(0, 20)}</p>
                        </Fieldset>
                        <div className="d-flex flex-column ">
                            <p>{formatDate(props.data.createdAt)}</p>
                            <p>{getTime(props.data.createdAt)}</p>
                        </div>
                    </WindowContent>
                </Window>
            </div>

            <CustomModal
                show={showEditNote}
                setShow={setShowEditNote}
                onClose={() => { setShowEditNote(false) }}
                content={
                    <EditNote
                        onClose={() => { setShowEditNote(false) }}
                        data={noteData}
                        reloadData={props.reloadData}
                    />
                }
            />
        </>
    )
}