import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Fieldset, TextField, Button } from 'react95'
import { Requests } from '../../Api/Requests';
import Auth from '../../Utils/Auth';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const handleClick = async () => {
        await Requests.login({ email: email, password: password })
            .then((res) => {
                if (res.status == 200) {
                    // console.log(res.data);
                    setErrorMessage('');
                    Auth.authenticate();
                    localStorage.setItem("authKey", res.data.token);
                    navigate('/dashboard', { state: { name: res.data.user.name } });
                }
            })
            .catch((err) => {
                // console.log(err);
                if (err.message.includes("401")) {
                    setErrorMessage("Invalide credentials ,  Try again .")
                } else if (err.message.includes("400")) {
                    setErrorMessage("Bad request , Enter both email and password !!")
                } else {
                    setErrorMessage("Internal server error !")
                }
            })
    }
    return (
        <div className='p-3'>
            <>
                <div>Email :</div>
                <TextField
                    value={email}
                    placeholder='Enter Email...'
                    onChange={(e) => { setEmail(e.target.value) }}
                    fullWidth
                    type={"email"}
                />

                <div className='mt-3'>Password :</div>
                <TextField
                    value={password}
                    placeholder='Enter password...'
                    onChange={(e) => { setPassword(e.target.value) }}
                    fullWidth
                    type={"password"}
                />

                <div className='d-flex align-items-center justify-content-center mt-3'>
                    <Button primary fullWidth onClick={handleClick}>Login</Button>
                </div>

                <div className="error text-danger text-center m-2">
                    <p>{errorMessage}</p>
                </div>
            </>
        </div>
    )
}
