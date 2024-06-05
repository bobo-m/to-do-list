import { useState } from 'react';
import { StateValue } from '../../context/StateProvider';
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from 'axios';
import { v1 as uuid } from 'uuid';
import './NewSubTask.css';

export default function NewSubTask({parentTask, setSubtaskInputOpen}){
    //eslint-disable-next-line
    const [state, dispatch] = StateValue();
    const[subtask, setSubtask] = useState('');
    const[focused, toggleFocused] = useState(false);
    const { user } = useAuthContext();

    const handleSubmit=async (e)=>{
        if(e.key === 'Enter'){
            if(!user){
                return;
            };

            const newSubtask = {
                id : uuid(),
                title: subtask,
                isDone: false
            }
            try {
                await axios.put('https://task-manager-xsxw.onrender.com/api/tasks/subtasks',{
                    parentTaskId: parentTask.id,
                    subtask: newSubtask
                },{
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                });

                dispatch({
                    type: 'addSubtask',
                    parentTaskId: parentTask.id,
                    subtask: newSubtask
                });

                setSubtask('');
                setSubtaskInputOpen(false);
            } catch (error) {
                if(error.response){
                    console.log(error.response.data);
                }else{
                    console.log('Error: ', error);
                };
            }
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