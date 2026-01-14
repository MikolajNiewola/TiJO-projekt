import { NavLink } from 'react-router-dom';
import './styles/Error.css';

function Error() {
    return (
        <div className="error-page">
            <div className="error-card">
                <h1 className="error-code">404</h1>
                <h2 className="error-title">Page not found</h2>
                <p className="error-message">The page you're looking for doesn't exist or has been moved.</p>
                <NavLink to="/" className="error-button">Go to Home</NavLink>
            </div>
        </div>
    )
}

export default Error;