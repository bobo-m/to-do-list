import { useEffect, useRef, useState } from 'react';
import { StateValue } from '../../StateProvider';
import axios from 'axios';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Cancel from '@mui/icons-material/Cancel';
import './SubTask.css';

export default function Subtask({parentTask, subtask, isDone, removeSubtask}){
    // eslint-disable-next-line
    const [state, dispatch] = StateValue();
    const [done, setDone] = useState(subtask.isDone)
    const [title, setTitle] = useState(subtask.task)
    const [focused, setFocused] = useState(false)
    const inputRef = useRef(null)

    useEffect(()=>{
        if(subtask.task !== title){
            dispatch({
                type: 'editSubtask',
                subtask:{
                    id: subtask.id,
                    task: title,
                    parentTask: parentTask.id
                }
            })
        }
    },[title, parentTask, subtask, dispatch])

    useEffect(()=>{
        if(!focused && inputRef.current){
            inputRef.current.focus();
        }
    },[focused])

    const handleClick = async () =>{
        await axios.put('/api/tasks/subtasks/done',{
            parentTaskId: parentTask.id,
            subtask: {
                id: subtask.id,
                isDone: !done
            }
        })
        setDone(!done);
    }
    const handleRemove = async (id)=>{
        await axios.delete('/api/tasks/subtasks', {
            data: {
                parentTask: parentTask.id,
                subtask: id
            }
        })
        removeSubtask(id)
    }
    const editTitle = async (val) =>{
        await axios.put('/api/tasks/subtasks/task', {
            parentTaskId: parentTask.id,
            subtask: {
                id: subtask.id,
                task: val
            }
        })
        setTitle(val);
    }
    return(
        <div className={`subtask ${focused? 'focus' : ''}`}>
            <button onClick={(e)=>handleClick(e)} className="checkbox">
                {done && <CheckCircle style={{color : 'white'}}/>}
            </button>
            <input 
                onFocus={()=>{
                    setFocused(true)
                    inputRef.current = true
                }} 
                onBlur={()=>{
                    setFocused(false)
                    inputRef.current = null
                }} 
                onChange={(e)=>editTitle(e.target.value)} 
                className={`subtask-description ${done? 'subtask-done':''}`} 
                value={title}
            />
            {done 
                && <button onClick={()=>handleRemove(subtask.id)} className="remove"><Cancel style={{color: 'white'}}/></button> 
            }
        </div>
    )
}