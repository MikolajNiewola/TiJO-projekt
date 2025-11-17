import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/NewTask.css';


const countId = () => {
    const storedTasks = localStorage.getItem('tasks');
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];
    return tasks.length + 1;
}

function NewTask() {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('medium');
    const [description, setDescription] = useState('');

    var d = new Date();
    var date = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    var time = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim()) {
            alert('Please enter a task title');
            return;
        }

        if (!priority) {
            alert('Please select a priority');
            return;
        }

        const newTask = {
            id: countId(),
            title: title,
            priority: priority,
            status: 'pending',
            description: description,
            dateAdded: date,
            timeAdded: time
        };

        console.log('New Task:', newTask);

        const storedTasks = localStorage.getItem('tasks');
        const tasks = storedTasks ? JSON.parse(storedTasks) : [];
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        alert(`Task "${title}" added successfully!`);

        navigate('/');
    };

    return (
        <div className="new-task-container">
            <div className="new-task-card">
                <h2>Create New Task</h2>
                <form onSubmit={handleSubmit} id='form'>
                    <div className="form-group">
                        <label>Title:</label>
                        <input 
                            type="text" 
                            name="title"
                            onChange={e => setTitle(e.target.value)}
                            placeholder="Enter task title"
                        />
                    </div>
                    <div className="form-group">
                        <label>Priority:</label>
                        <div className="radio-group">
                            <label className="radio-option">
                                <input
                                    type="radio"
                                    name="priority"
                                    value="low"
                                    checked={priority === 'low'}
                                    onChange={e => setPriority(e.target.value)}
                                />
                                <span>Low</span>
                            </label>

                            <label className="radio-option">
                                <input
                                    type="radio"
                                    name="priority"
                                    value="medium"
                                    checked={priority === 'medium'}
                                    onChange={e => setPriority(e.target.value)}
                                />
                                <span>Medium</span>
                            </label>

                            <label className="radio-option">
                                <input
                                    type="radio"
                                    name="priority"
                                    value="high"
                                    checked={priority === 'high'}
                                    onChange={e => setPriority(e.target.value)}
                                />
                                <span>High</span>
                            </label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea 
                            name="description"
                            placeholder="Enter task description"
                            rows="5"
                            onChange={e => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="form-info">
                        <p><strong>Date:</strong> {date} at {time}</p>
                    </div>
                    <div className="form-buttons">
                        <button type="submit" className="btn-submit">Add Task</button>
                        <button 
                            type="button" 
                            className="btn-cancel"
                            onClick={() => navigate('/')}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewTask;