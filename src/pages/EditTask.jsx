import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './styles/NewTask.css';

function EditTask() {
    const { id } = useParams();
    const taskId = Number(id);
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('medium');
    const [description, setDescription] = useState('');
    const [dateAdded, setDateAdded] = useState('');
    const [timeAdded, setTimeAdded] = useState('');

    useEffect(() => {
        const stored = localStorage.getItem('tasks');
        const tasks = stored ? JSON.parse(stored) : [];
        const task = tasks.find(t => t.id === taskId);
        if (!task) {
            alert('Task not found');
            navigate('/');
            return;
        }

        setTitle(task.title || '');
        setPriority(task.priority || 'medium');
        setDescription(task.description || '');
        setDateAdded(task.dateAdded || '');
        setTimeAdded(task.timeAdded || '');
    }, [taskId, navigate]);

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

        const stored = localStorage.getItem('tasks');
        const tasks = stored ? JSON.parse(stored) : [];

        const updated = tasks.map(t => {
            if (t.id === taskId) {
                return {
                    ...t,
                    title,
                    priority,
                    description,
                    dateAdded: t.dateAdded || dateAdded,
                    timeAdded: t.timeAdded || timeAdded
                };
            }
            return t;
        });

        try {
            localStorage.setItem('tasks', JSON.stringify(updated));
            alert('Task updated successfully');
            navigate('/');
        } catch (err) {
            console.error('Failed to save task', err);
            alert('Failed to save task');
        }
    };

    return (
        <div className="new-task-container">
            <div className="new-task-card">
                <h2>Edit Task</h2>
                <form onSubmit={handleSubmit} id='form'>
                    <div className="form-group">
                        <label>Title:</label>
                        <input 
                            type="text" 
                            name="title"
                            value={title}
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
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Enter task description"
                            rows="5"
                        ></textarea>
                    </div>
                    <div className="form-info">
                        <p><strong>Date added:</strong> {dateAdded} at {timeAdded}</p>
                    </div>
                    <div className="form-buttons">
                        <button type="submit" className="btn-submit">Save Changes</button>
                        <button type="button" className="btn-cancel" onClick={() => navigate('/')}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditTask;
