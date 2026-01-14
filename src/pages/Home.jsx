import TaskList from '../components/TaskList';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Home.css';


function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userEmail = localStorage.getItem('userEmail');
        setIsLoggedIn(!!userEmail);
    }, []);

    return (
        <div className='home-body'>
            <h1 className="home-title">ToDoList.</h1>
            {isLoggedIn ? (
                <TaskList />
            ) : (
                <div className="login-prompt">
                    <p>You need to be logged in to see your tasks.</p>
                    <button onClick={() => navigate('/login')} className="login-prompt-button">Go to Login</button>
                </div>
            )}
        </div>
    );
}

export default Home;