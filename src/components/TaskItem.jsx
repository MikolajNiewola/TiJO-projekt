import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPenToSquare, faSquareCheck, faSquareXmark } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import './styles/TaskItem.css';

function TaskItem({ id, title, priority, status, description, dateAdded, timeAdded, onDelete, onComplete }) {
    const navigate = useNavigate();
    return (
        <div className="card" data-priority={priority}>
            <div className="card-header">
                <p className={`status-badge status-${status}`}>{status}</p>
                <div>
                    <button 
                        className={`action-button ${status === 'done' ? 'active' : ''}`}
                        title={status === 'done' ? "Mark as pending" : "Mark as complete"}
                        onClick={() => onComplete(id)}
                    >
                        <FontAwesomeIcon icon={status === 'done' ? faSquareXmark : faSquareCheck} />
                    </button>
                    <button 
                        className="action-button"
                        title="Delete task"
                        onClick={() => {
                            if (window.confirm('Are you sure you want to delete this task?')) {
                                onDelete(id);
                            }
                        }}
                    >
                        <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                    <button 
                        className="action-button"
                        title="Edit task"
                        onClick={() => navigate(`/edit/${id}`)}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </div>
            </div>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">Priority: {priority}</h6>
                <p className="card-text">{description}</p>
            </div>
            <div className="card-footer text-body-secondary">
                Date added: {dateAdded} at {timeAdded}
            </div>
            
        </div>
    );
}

export default TaskItem;