import { useEffect, useRef, useState } from 'react';
import { StateValue } from '../../context/StateProvider';
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from 'axios';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Cancel from '@mui/icons-material/Cancel';
import './SubTask.css';

export default function Subtask({parentTask, subtask, removeSubtask}){
    // eslint-disable-next-line
    const [state, dispatch] = StateValue();
    const [done, setDone] = useState(subtask.isDone);
    const [title, setTitle] = useState(subtask.title);
    const [focused, setFocused] = useState(false);
    const inputRef = useRef(null);
    const { user } = useAuthContext();

    useEffect(()=>{
        if(!focused && inputRef.current){
            inputRef.current.focus();
        }
    },[focused])

    const handleClick = async () =>{
        if(!user){
            return;
        };

        try {
            await axios.put('/api/tasks/subtasks/done',{
                parentTaskId: parentTask.id,
                subtask: {
                    id: subtask.id,
                    isDone: !done
                }
            },{
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            setDone(!done);
        } catch (error) {
            if(error.response){
                console.log(error.response.data);
            }else{
                console.log('Error: ', error);
            };
        };
    }
    const handleRemove = async (id)=>{
        if(!user){
            return;
        };

        console.log(id)

        try {
            await axios.delete('/api/tasks/subtasks', {
                headers: {
                    Authorization: `Bearer ${user.token}`
                },
                data: {
                    parentTaskId: parentTask.id,
                    subtaskId: id
                }
            });
            removeSubtask(id);
        } catch (error) {
            if(error.response){
                console.log(error.response.data);
            }else{
                console.log('Error: ', error);
            };
        };
    };

    const editTitle = async (val) =>{
        if(!user){
            return;
        };

        try {
            await axios.put('/api/tasks/subtasks/title', {
                parentTaskId: parentTask.id,
                subtask: {
                    id: subtask.id,
                    title: val
                }
            },{
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            dispatch({
                type: 'editSubtask',
                subtask:{
                    id: subtask.id,
                    title: title,
                    parentTask: parentTask.id
                }
            });

            setTitle(val);
        } catch (error) {
            if(error.response){
                console.log(error.response.data);
            }else{
                console.log('Error: ', error);
            };
        };
    };
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