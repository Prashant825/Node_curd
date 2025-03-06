import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function ShowAlluser() {

    const userAuth = useSelector((state) => state.auth.email);
    const navigate = useNavigate();
    if(!userAuth){

        navigate('/');
    }

    const [userdata, userData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [deteleUser, setDeteleUser] = useState();

    //Update form fields..
    var [name, setUserName] = useState('');
    var [email, setUserEmail] = useState('');
    var [password, setUserPass] = useState('');
    var [userid, setUserId] = useState('');
    var [updaterecord, setUpdateRecord] = useState('');

    // Show All User API.....
    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:5000/get/users');

            const data = await response.json();
            userData(data);
        }
        fetchData();
    }, [deteleUser, updaterecord]);

    // Autofill User Update From.....
    async function autofillHandle(user_id, user_name, user_email, user_password) {
        setShowModal(true);
        setUserId(user_id);
        setUserName(user_name);
        setUserEmail(user_email);
        setUserPass(user_password);
    }

    // User Update API......
    async function updateHandle(e) {
        e.preventDefault();
        const updateUser = { name, email, password };

        const response = await fetch(`http://localhost:5000/update/user/${userid}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },

            body: JSON.stringify(updateUser),
        });
        if (response) {
            setShowModal(false);
            setUpdateRecord(response);
        }
    }

    // User Delete API.....
    async function deleteHandle(email) {
        const response = await fetch(`http://localhost:5000/delete/user/${email}`, {
            method: 'DELETE',

        });
       if(response){
        setDeteleUser(response);
       }

    }
    return (
        <div>

            <div className="table-container">
                <h4>User List</h4>

                <table>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            userdata.map((user, index) => (

                                <tr>
                                    <td>{index+1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.password}</td>
                                    <td className="action-btn"><button className="btn btn-primary" onClick={() => autofillHandle(user._id, user.name, user.email, user.password)}>Update</button>
                                        <button className="btn btn-danger" onClick={() => deleteHandle(user.email)}>Delete</button>
                                    </td>
                                </tr>   
                            ))
                        }
                    </tbody>
                   
                </table>
            </div>
            {showModal && (
                <div className="modal d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Update User</h5>
                                <button className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={updateHandle}>
                                    <div className="mb-3">
                                        <label className="form-label">Name</label>
                                        <input type="text" className="form-control" value={name} onChange={(e) => setUserName(e.target.value)} name="name" required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <input
                                            type="text" className="form-control" value={email} onChange={(e) => setUserEmail(e.target.value)} name="username" required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Password</label>
                                        <input type="password" className="form-control" value={password} onChange={(e) => setUserPass(e.target.value)} name="password" required />
                                        <input type="hidden" value={userid} onChange={(e) => setUserId(e.target.value)} />
                                    </div>
                                    <button type="submit" className="btn btn-success">
                                        Update
                                    </button>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Backdrop */}
            {showModal && <div className="modal-backdrop show"></div>}
        </div >
    )
}
