import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddUser() {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();

        const userData = { name, email, password };
        console.log(userData);

        try {

            const response = await fetch('http://localhost:5000/insert/user', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),

            });
            const data = await response.json();
            console.log(response);
            

            if (response.ok) {
                console.log(data.message);
                setName('');
                setEmail('');
                setPassword('');
                navigate('/showuser');
            }else{
                console.log(data.message); 
            }

        }
        catch (error) {
            console.log('Error: ', error);

        }
    }
    return (
        <div className="user-insert-form">
            <h2>Add User</h2>

            <form className="card p-4 shadow" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                
                {/* Submit Button */}
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>

        </div>
    )
}
export default AddUser;