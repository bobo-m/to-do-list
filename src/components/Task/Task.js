import { useState } from 'react';
import './Task.css';
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function Task({name, id, isDone}){
    const [done, setDone] = useState(isDone)
    const handleClick = (e) =>{
        e.preventDefault();
        setDone(true)
    }
    return(
        <Link to={`${id}`}>
            <div className="task">
            <button onClick={(e)=>handleClick(e)} className="checkbox">
                {done && <CheckCircleIcon style={{color : 'black', backgroundColor:'white', borderRadius: '50%'}}/>}
            </button>
            <p className='task-description'>
                <span className={`isChecked ${done? 'isChecked--true' :''}`}></span>
                {name}</p>
            </div>
        </Link>
    )
}

export default Task;