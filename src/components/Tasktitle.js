import Task from './Task';
import './Tasktitle.css';
import { useState } from 'react';

function Tasktitle({name}){
    const [tasksOpen, toggleTasksOpen] = useState(false);
    const toggleShowTasks=()=>{
        toggleTasksOpen(!tasksOpen);
    }
    return (
        <>
        <h3 onClick={toggleShowTasks} className={`tasktitle-heading tasktitle-${name}`}>
            {name.charAt(0).toUpperCase() + name.slice(1)}
        </h3>
        <div className={`tasks ${tasksOpen ? 'open' : ''}`}>
            <div>
            <Task 
                name='Write Code'
                isDone={false}
            />
            <Task
                name='Do Laundry'
                isDone={false}
            />
            </div>
        </div>
        </>
    );
}

export default Tasktitle;