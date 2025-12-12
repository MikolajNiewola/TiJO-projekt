import { NavLink } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

import './styles/Navbar.css';

function Navbar() {
    const [userEmail, setUserEmail] = useState(null);

    useEffect(() => {
        const email = localStorage.getItem('userEmail');
        setUserEmail(email);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userEmail');
        setUserEmail(null);
        window.location.assign('/');
    };

    const isLogged = !!userEmail;

    return (
        <nav className="navbar">
            <div className="nav-container">
                <ul className="nav-links">
                    <li>
                        <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}> Home </NavLink>
                    </li>
                    {isLogged && (
                        <li>
                            <NavLink to="/statistics" className={({ isActive }) => isActive ? 'active' : ''}> Statistics </NavLink>
                        </li>
                    )}
                    <li>
                        <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}> About </NavLink>
                    </li>
                    <li className="login-item">
                        {userEmail ? (
                            <div className="user-section">
                                <span className="user-email"><FontAwesomeIcon icon={faUser} /> {userEmail}</span>
                                <button onClick={handleLogout} className="logout-button"><FontAwesomeIcon icon={faSignOutAlt} />Logout</button>
                            </div>
                        ) : (
                            <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}> <FontAwesomeIcon icon={faUser} /> Login </NavLink>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;