import { StateValue } from '../../context/StateProvider';
import Task from '../Task/Task';
import './TaskTitle.css';
import { useEffect, useState } from 'react';
import { v1 as uuid } from 'uuid';

function Tasktitle({name , tasks, isOpen}){
    // eslint-disable-next-line
    const [state, dispatch] = StateValue()
    const [tasksOpen, toggleTasksOpen] = useState(isOpen);
    const [taskState , setTasks] = useState(tasks);

    useEffect(()=>{
        setTasks(tasks);
    },[tasks, setTasks])
    
    const toggleShowTasks=()=>{
        toggleTasksOpen(!tasksOpen);
    }
    const handleRemove = (id) =>{
        dispatch({
            type: 'removeTask',
            id: id
        })
    }
    return (
        <>
        <h3 onClick={toggleShowTasks} className={`tasktitle-heading tasktitle-${name}`}>
            {name.charAt(0).toUpperCase() + name.slice(1)}
        </h3>
        <div className={`tasks ${tasksOpen ? 'open' : ''}`}>
            <div>
            {taskState.map((task)=>(
                <Task
                    key={uuid()}
                    id={task.id}
                    name={task.title}
                    isDone={task.isDone? task.isDone : false}
                    removeTask={handleRemove}
                />
            ))}
            </div>
        </div>
        </>
    );
}

export default Tasktitle;