import { useEffect, useState } from 'react';
import './styles/Statistics.css';


function Statistics() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        try {
            const stored = localStorage.getItem('tasks');
            const parsed = stored ? JSON.parse(stored) : [];
            setTasks(parsed || []);
        } catch (e) {
            console.error('Failed to load tasks from localStorage:', e);
            setTasks([]);
        }
    }, []);

    const total = tasks.length;
    
    let high = 0, medium = 0, low = 0;
    tasks.forEach(t => {
        const p = t.priority.toLowerCase();
        if (p === "high") high++;
        else if (p === "medium") medium++;
        else if (p === "low") low++;
    });

    const byPriority = { high, medium, low };
    const doneCount = tasks.filter(t => (t.status || '').toLowerCase() === 'done').length;
    const pendingCount = total - doneCount;
    const percentDone = Math.round((doneCount / total) * 100);

    return (
        <div className="statistics-page">
            <div className="statistics-container">
                <div className="statistics-card">
                    <div className="statistics-header">
                        <h2>Statistics</h2>
                    </div>

                    <div className="statistics-grid">
                        <div className="statistics-tile">
                            <div className="title">Total Tasks</div>
                            <div className="value">{total}</div>
                        </div>

                        <div className="statistics-tile">
                            <div className="title">Done</div>
                            <div className="value">{doneCount}</div>
                            <div className="sub">{percentDone}% completed</div>
                            <div className="statistics-progress">
                                <div className="fill" style={{ width: `${percentDone}%` }}></div>
                            </div>
                        </div>

                        <div className="statistics-tile">
                            <div className="title">Pending</div>
                            <div className="value">{pendingCount}</div>
                        </div>

                        <div className="statistics-tile">
                            <div className="title">High Priority</div>
                            <div className="value">{byPriority.high}</div>
                        </div>

                        <div className="statistics-tile">
                            <div className="title">Medium Priority</div>
                            <div className="value">{byPriority.medium}</div>
                        </div>

                        <div className="statistics-tile">
                            <div className="title">Low Priority</div>
                            <div className="value">{byPriority.low}</div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Statistics;