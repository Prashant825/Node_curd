
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { login } from './UserAuth/userSlice';
import { useNavigate } from 'react-router-dom';

export default function UserLogin() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function loginHandle(event) {
        event.preventDefault();
        const userLogin = { email, password };
        const response = await fetch('http://localhost:5000/user/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },

            body: JSON.stringify(userLogin),
        });

        const data = await response.json();

        if (response.ok) {
            dispatch(login({ email }));
            navigate('/showuser');
            console.log(data.message);
        } else {
            console.log(data.message);
        }


    }

    return (
        <div class="container mt-5">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="card shadow-lg">
                        <div class="card-header text-center bg-primary text-white">
                            <h4>Login</h4>
                        </div>
                        <div class="card-body">
                            <form id="loginForm" onSubmit={loginHandle}>
                                <div class="mb-3">
                                    <label for="usernameOrEmail" class="form-label">Username or Email</label>
                                    <input type="text" class="form-control" id="usernameOrEmail" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter username or email" required />
                                </div>
                                <div class="mb-3">
                                    <label for="password" class="form-label">Password</label>
                                    <input type="password" class="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required />
                                </div>
                                <button type="submit" class="btn btn-primary w-100">Login</button>
                            </form>
                        </div>
                        <div class="card-footer text-center">
                            <small>Don't have an account? <Link to='/register'>Register here</Link></small>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
