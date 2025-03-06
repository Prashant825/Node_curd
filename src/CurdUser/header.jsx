import React from 'react';
import { Link } from 'react-router-dom';
export default function Header() {
    return (
        <div>
            <nav className='navbar'>
                <div className='container'>
                    <ul className='nav-list'>
                        
                        <li className='nav-item'><Link to='/register'>Add User</Link></li>
                        <li className='nav-item'><Link to='/showuser'>Show User</Link></li>
                        <li className='nav-item'><Link to='/'>Login</Link></li>
                        <li className='nav-item'><Link>Logout</Link></li>
                    </ul>
                </div>
            </nav>
        </div>

    )
}
