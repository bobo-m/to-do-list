import { useEffect } from 'react';
import './AddSubTask.css';

function AddSubTask({subtaskInputOpen, showNewSubTaskInput}){


    useEffect(()=>{
        const handleWindowClick = (e) => {
            const addSubtaskElement = document.querySelector('.subtasks');
            if (addSubtaskElement && !addSubtaskElement.contains(e.target)) {
                showNewSubTaskInput(false);
            }
        };
        if(subtaskInputOpen){
            window.addEventListener('click', handleWindowClick);
        }else{
            window.removeEventListener('click', handleWindowClick);
        }

        return () => window.removeEventListener('click', handleWindowClick);
    },[subtaskInputOpen, showNewSubTaskInput])

    const handleClick=()=>{
        showNewSubTaskInput(true);
    }
    return(
        <div className="add-subtask">
            <button onClick={handleClick} className="addnew-subtask" type='button'>
                <span className='addnew-subtask-circle'></span>
                <span className="addnew-subtask-text">Add New Subtask</span>
            </button>
        </div>
    )
}

export default AddSubTask;