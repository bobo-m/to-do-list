import Task from '../Task/Task';
import './Tasktitle.css';
import { useState } from 'react';

function Tasktitle({name , tasks}){
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
            {tasks.map((task)=>(
                <Task
                    key={task.id}
                    name={task.task}
                    isDone={false}
                />
            ))}
            </div>
        </div>
        </>
    );
}

export default Tasktitle;