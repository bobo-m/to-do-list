import { useState } from 'react';
import { StateValue } from '../../StateProvider';
import axios from 'axios';
import { v1 as uuid } from 'uuid';
import './NewSubTask.css';

export default function NewSubTask({parentTask, setSubtaskInputOpen}){
    //check if component getting the right prop
    //eslint-disable-next-line
    const [state, dispatch] = StateValue();
    const[subtask, setSubtask] = useState('');
    const[focused, toggleFocused] = useState(false);

    const handleSubmit=async (e)=>{
        if(e.key === 'Enter'){
            const newSubtask = {
                id : uuid(),
                task: subtask
            }
            await axios.put('/api/tasks/subtasks',{
                parentTask: parentTask.id,
                subtask: newSubtask
            })
            dispatch({
                type: 'addSubtask',
                parentTask: parentTask.id,
                subtask: newSubtask
            })
            // addNewSubtask(subtask);
            setSubtask('');
            setSubtaskInputOpen(false);
        }else return
    }

    return(
        <div className= {`new-subtask ${focused ? 'focused': ''}`}>
            <span className="new-subtask-circle"></span>
            <input 
                type="text" 
                className='new-subtask-input' 
                value={subtask} 
                onChange={(e)=>setSubtask(e.target.value)}
                onFocus={()=>toggleFocused(true)}
                onBlur={()=>toggleFocused(false)}
                onKeyDown={(e)=>handleSubmit(e)}
                autoFocus
            />
        </div>
    )
}