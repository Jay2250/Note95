import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Fieldset, TextField, Button } from 'react95'
import { Requests } from '../../Api/Requests';
import Auth from '../../Utils/Auth';
export default function Register() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleClick = async () => {
        await Requests.register(userInfo)
            .then((res) => {
                if (res.status == 201) {
                    // console.log(res.data);
                    setErrorMessage('');
                    Auth.authenticate();
                    localStorage.setItem("authKey", res.data.token);
                    navigate('/dashboard',{state:{name:res.data.user.name}});
                }
                console.log(res);
            })
            .catch((err) => {
                console.log(err.message);
                if (err.message.includes("401")) {
                    setErrorMessage("Invalide credentials ,  Try again .")
                } else if (err.message.includes("400")) {
                    setErrorMessage("Bad request , Enter All the required fields !!")
                } else if (err.message.includes("500")) {
                    setErrorMessage("Alredy registered ! , Go to login .");
                } else {
                    setErrorMessage("Internal Server Error >>>");
                }
            })
    }

    return (
        <>
            <Fieldset>
                <div>Name :</div>
                <TextField
                    value={userInfo.name}
                    placeholder='Enter Name...'
                    onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                    fullWidth
                />

                <div className='mt-3'>Email :</div>
                <TextField
                    value={userInfo.email}
                    placeholder='Enter Email...'
                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                    fullWidth
                    type={"email"}
                />

                <div className='mt-3'>Password :</div>
                <TextField
                    value={userInfo.password}
                    placeholder='Enter password...'
                    onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
                    fullWidth
                    type={"password"}
                />

                <div className='d-flex align-items-center justify-content-center mt-3'>
                    <Button primary fullWidth onClick={handleClick}>Register</Button>
                </div>

                <div className="error text-danger text-center m-2">
                    <p>{errorMessage}</p>
                </div>
            </Fieldset>
        </>
    )
}
