import { useState } from 'react';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Cancel from '@mui/icons-material/Cancel';
import './SubTask.css';

export default function Subtask({subtask, isDone, removeSubtask}){
    const [done, setDone] = useState(isDone)
    const [title, setTitle] = useState(subtask.task)
    const [focused, setFocused] = useState(false)
    const handleClick = () =>{
        setDone(!done);
    }
    const editTitle = (val) =>{
        setTitle(val);
    }
    return(
        <div className={`subtask ${focused? 'focus' : ''}`}>
            <button onClick={(e)=>handleClick(e)} className="checkbox">
                {done && <CheckCircle style={{color : 'white'}}/>}
            </button>
            <input onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} onChange={(e)=>editTitle(e.target.value)} className={`subtask-description ${done? 'subtask-done':''}`} value={title}/>
            {done 
                && <button onClick={()=>removeSubtask(subtask.id)} className="remove"><Cancel style={{color: 'white'}}/></button> 
            }
        </div>
    )
}