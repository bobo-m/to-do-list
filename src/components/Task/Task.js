import { useState } from 'react';
import './Task.css';
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CancelIcon from '@mui/icons-material/Cancel';

function Task({name, id, isDone, removeTask}){
    const [done, setDone] = useState(isDone)
    const [menuOpen, toggleMenu] = useState(false)
    const handleClick = (e) =>{
        e.preventDefault();
        setDone(!done);
    }
    const handleUtility = (e) =>{
        e.preventDefault();
        done ? removeTask(id) : openUtilityMenu();
    }
    const openUtilityMenu = () =>{
        toggleMenu(!menuOpen);
    }
    return(
        <Link to={`${id}`}>
            <div className="task">
                <button onClick={(e)=>handleClick(e)} className="checkbox">
                    {done && <CheckCircleIcon style={{color : 'white'}}/>}
                </button>
                <p className='task-description'>
                    <span className={`isChecked ${done? 'isChecked--true' :''}`}></span>
                    {name}
                </p>
                <button onClick={(e)=>handleUtility(e)} className={`task-utility ${done ? 'utility-remove' : 'utility-options'}`}>
                    {done 
                        ? <CancelIcon style={{color:'white'}}/> 
                        : <MoreVertIcon style={{color:'white'}}/>}
                </button>
            </div>
        </Link>
    )
}

export default Task;