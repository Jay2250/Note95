import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppBar, Button, Toolbar, List, ListItem, Divider, TextField, Avatar, Bar } from 'react95';
import logo from '../../../Assests/logo192.png';
export default function Navbar(props) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('authKey');
        navigate('/login');
    }
    return (
        <>
            <AppBar style={{ 'zIndex': '998' }}>
                <Toolbar style={{ justifyContent: 'space-between' }}>
                    <div className='d-flex'>
                        <img
                            src={logo}
                            alt='react95 logo'
                            style={{ height: '20px', marginRight: 4 }}
                        />
                        <p>Note 95</p>
                    </div>
                    <div className="d-flex">
                        <Button size='lg' onClick={props.addNote} >
                            {'+ Add Note'}
                        </Button>
                        <Bar className='ms-1 me-1' size='35' />
                        <Button size='lg' onClick={() => setOpen(!open)}>
                            <Avatar noBorder src={logo} />
                            {`Hello  ${props.userName}`}
                        </Button>
                        <Bar className='ms-1 me-1' size='35' />
                        <Button size='lg' >
                            {'⚓️'}
                        </Button>
                    </div>
                </Toolbar>

                {open && (
                    <List
                        style={{
                            position: 'absolute',
                            left: '90%',
                            top: '100%'
                        }}
                        onClick={() => setOpen(false)}
                    >
                        <ListItem>
                            <span role='img' aria-label='👨‍💻'>
                                👨‍💻
                            </span>
                            Profile
                        </ListItem>
                        <Divider />
                        <ListItem onClick={() => { handleLogout() }}>
                            <span role='img' aria-label='🔙'>
                                🔙
                            </span>
                            Logout
                        </ListItem>
                    </List>
                )}
            </AppBar>
        </>
    )
}