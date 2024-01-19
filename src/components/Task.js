import './Task.css';
import { Link } from 'react-router-dom';

function Task({name, isDone}){
    return(
        <Link to={`${name.toLowerCase().replace(/\s+/g, '-')}`}>
            <div className="task">
            <button className="checkbox">
                
            </button>
            <p className='task-description'>{name}</p>
            </div>
        </Link>
    )
}

export default Task;