import { useState } from 'react';
import './NewSubTask.css';

export default function NewSubTask({addNewSubtask}){
    const[subtask, setSubtask] = useState('');
    const[focused, toggleFocused] = useState(false);

    const handleSubmit=(e)=>{
        if(e.key === 'Enter'){
            addNewSubtask(subtask);
            setSubtask('');
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