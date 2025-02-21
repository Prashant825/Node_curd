import React, { useState } from "react";

function AddUser() {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    

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
            if (response) {
                console.log(response);
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
            <p>name: {name}</p>
        </div>
    )
}
export default AddUser;