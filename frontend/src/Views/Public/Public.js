import React, { useState } from 'react'
import styled from 'styled-components';
import {
    Window,
    WindowContent,
    WindowHeader,
    Tabs,
    Tab,
    TabBody,
    Fieldset,
    Checkbox,
    Button
} from 'react95';
import Login from './Login';
import Register from './Register';
import { useNavigate } from 'react-router-dom';

function Public() {

    const [state, setState] = useState({
        activeTab: 0
    });
    const { activeTab } = state;
    const handleChange = (e, value) => setState({ activeTab: value });
    const [check, setCheck] = useState(false);
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/local/notes');
    }
    return (
        <div className='d-flex align-items-center justify-content-center'>
            <Window className='window w-50'>
                <WindowHeader className='window-header'>
                    <span>Note 95</span>
                </WindowHeader>
                <WindowContent className='w-100'>
                    <Tabs value={activeTab} onChange={handleChange}>
                        <Tab value={0}> <span className='p-2'>Login</span></Tab>
                        <Tab value={1}> <span className='p-2'>Register </span></Tab>
                        <Tab value={2}> <span className='p-2'>Continue without account</span></Tab>
                    </Tabs>
                    <TabBody >
                        {activeTab === 0 && (
                            <Login />
                        )}
                        {activeTab === 1 && (
                            <Register />
                        )}
                        {activeTab === 2 && (
                            <div>

                                <Fieldset>
                                    <p>
                                        You can continue without creating account ... <br /> Your Notes will not be accesible accross other devices will be stored locally !!
                                    </p>
                                    <Checkbox
                                        name='shipping'
                                        value='fast'
                                        label={`I ${check === false ? 'am clicking' : 'clicked'} this checkbox`}
                                        onChange={() => { setCheck(!check) }}
                                    />
                                    <div className='d-flex align-items-center justify-content-center mt-3'>
                                        <Button disabled={!check} primary fullWidth onClick={handleClick}>Go to DashBoard</Button>
                                    </div>
                                </Fieldset>
                            </div>
                        )}
                    </TabBody>
                </WindowContent>
            </Window>
        </div>
    )
}
export default Public