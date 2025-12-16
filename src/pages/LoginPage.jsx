import { useState } from 'react';
import { useNavigate } from 'react-router';
import './styles/LoginPage.css';

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumberOrSpecial = /[\d!@#$%^&*()_+=\-[\]{};':"\\|,.<>?]/.test(password);
    return hasUpperCase && hasNumberOrSpecial;
};

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!email.trim() || !password.trim()) {
            setError('Please fill in all fields.');
            return;
        }

        if (!validateEmail(email)) {
            setError('Please enter a valid email address (e.g., user@example.com).');
            return;
        }

        if (!validatePassword(password)) {
            setError('Incorrect password.');
            return;
        }

        localStorage.setItem('userEmail', email);
        window.dispatchEvent(new Event('login'));
        navigate('/');
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-card">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-input"
                            />
                        </div>

                        {error && <div className="login-error">{error}</div>}

                        <button type="submit" className="login-button">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;