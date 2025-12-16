import { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import './styles/TaskList.css';
import { NavLink } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faFilter, faSort, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

export const sortArray = (arr, type, direction = 'desc') => {
    const copy = arr.slice();
    if (!type) return copy;

    if (type === 'status') {
        copy.sort((a, b) => {
            const aDone = a.status === 'done' ? 1 : 0;
            const bDone = b.status === 'done' ? 1 : 0;
            return direction === 'desc' ? bDone - aDone : aDone - bDone;
        });
    } else if (type === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        copy.sort((a, b) => {
            return direction === 'desc'
                ? priorityOrder[b.priority] - priorityOrder[a.priority]
                : priorityOrder[a.priority] - priorityOrder[b.priority];
        });
    } else if (type === 'date') {
        copy.sort((a, b) => {
            const aTs = new Date(`${a.dateAdded}T${a.timeAdded || '00:00'}`).getTime();
            const bTs = new Date(`${b.dateAdded}T${b.timeAdded || '00:00'}`).getTime();
            return direction === 'desc' ? bTs - aTs : aTs - bTs;
        });
    }

    return copy;
};

export const loadTasksFromStorage = () => {
        try {
            const stored = localStorage.getItem('tasks');
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            return [];
        }
}

function TaskList() {
    const [allTasks, setAllTasks] = useState(loadTasksFromStorage);
    const [displayedTasks, setDisplayedTasks] = useState(allTasks);

    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [showSortMenu, setShowSortMenu] = useState(false);
    const [filters, setFilters] = useState({
        priority: [],
        status: []
    });
    const [sortState, setSortState] = useState({ type: null, direction: 'desc' });
    const priorities = ['high', 'medium', 'low'];
    const statuses = ['pending', 'done'];

    useEffect(() => {
        try {
            localStorage.setItem('tasks', JSON.stringify(allTasks));
        } catch (e) {
            console.error('Failed to save tasks to localStorage:', e);
        }
    }, [allTasks]);

    useEffect(() => {
        let filtered = allTasks.slice();

        if (filters.priority.length > 0) {
            filtered = filtered.filter(task => filters.priority.includes(task.priority));
        }

        if (filters.status.length > 0) {
            filtered = filtered.filter(task => filters.status.includes(task.status));
        }

        if (sortState && sortState.type) {
            filtered = sortArray(filtered, sortState.type, sortState.direction);
        }

        setDisplayedTasks(filtered);
    }, [filters, allTasks, sortState]);

    const handleFilterToggle = (type, value) => {
        setFilters(prevFilters => {
            const currentFilters = [...prevFilters[type]];
            const index = currentFilters.indexOf(value);

            if (index === -1) currentFilters.push(value);
            else currentFilters.splice(index, 1);

            return { ...prevFilters, [type]: currentFilters };
        });
    };

    const handleSort = (type) => {
        let direction = 'desc';
        if (sortState.type === type) {
            direction = sortState.direction === 'desc' ? 'asc' : 'desc';
        }

        const sorted = sortArray(displayedTasks, type, direction);
        setDisplayedTasks(sorted);
        setSortState({ type, direction });
        setShowSortMenu(false);
    };
    
    const handleDeleteTask = (taskId) => { 
        setAllTasks(prev => prev.filter(t => t.id !== taskId)); 
    }; 
    
    const handleCompleteTask = (taskId) => { 
        setAllTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: t.status === 'done' ? 'pending' : 'done' } : t));
    };

    return (
        <div>
            <div className="task-list-header">
                <div className="filter-sort-container">
                    <div className="filter-container">
                        <button className="filter-button" onClick={() => setShowFilterMenu(!showFilterMenu)}> <FontAwesomeIcon icon={faFilter} /> Filter </button>
                        {showFilterMenu && (
                            <div className="filter-menu">
                                <div className="filter-section">
                                    <h4>Priority</h4>
                                    {priorities.map(priority => (
                                        <label key={priority} className="filter-option">
                                            <input
                                                type="checkbox"
                                                checked={filters.priority.includes(priority)}
                                                onChange={() => handleFilterToggle('priority', priority)}
                                            />
                                            {priority.charAt(0).toUpperCase() + priority.slice(1)}
                                        </label>
                                    ))}
                                </div>
                                <div className="filter-section">
                                    <h4>Status</h4>
                                    {statuses.map(status => (
                                        <label key={status} className="filter-option">
                                            <input
                                                type="checkbox"
                                                checked={filters.status.includes(status)}
                                                onChange={() => handleFilterToggle('status', status)}
                                            />
                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="sort-container">
                        <button className="sort-button" onClick={() => setShowSortMenu(!showSortMenu)}>
                            <FontAwesomeIcon icon={faSort} /> Sort
                            {sortState && sortState.type && (
                                <span className="sort-indicator"> 
                                    {sortState.type === 'priority' ? 'Priority' : sortState.type === 'status' ? 'Status' : 'Date'}
                                    <FontAwesomeIcon icon={sortState.direction === 'desc' ? faChevronDown : faChevronUp} style={{ marginLeft: '6px' }} />
                                </span>
                            )}
                        </button>
                        {showSortMenu && (
                            <div className="sort-menu">
                                <button onClick={() => handleSort('priority')}>By Priority</button><br />
                                <button onClick={() => handleSort('status')}>By Status</button><br />
                                <button onClick={() => handleSort('date')}>By Date</button><br />
                            </div>
                        )}
                    </div>
                </div>
                <NavLink to="/new-task" className="add-task-button">
                    <FontAwesomeIcon icon={faPlus} /> Add New Task
                </NavLink>
            </div>

            <div className="task-list">
                {displayedTasks && displayedTasks.length > 0 ? displayedTasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        priority={task.priority}
                        status={task.status}
                        description={task.description}
                        dateAdded={task.dateAdded}
                        timeAdded={task.timeAdded}
                        onDelete={handleDeleteTask}
                        onComplete={handleCompleteTask}
                    />
                )) : (
                    <p style={{ color: '#aaa', textAlign: 'center', width: '100%' }}>No tasks to show.</p>
                )}
            </div>
        </div>
    );
}

export default TaskList;
