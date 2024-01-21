import './Task.css';
import { Link } from 'react-router-dom';

function Task({name, id, isDone}){
    return(
        <Link to={`${id}`}>
            <div className="task">
            <button className="checkbox">
                
            </button>
            <p className='task-description'>{name}</p>
            </div>
        </Link>
    )
}

export default Task;