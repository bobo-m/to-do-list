import './TaskCard.css';
import tasksData from '../../tasks';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SubTask from '../SubTask/SubTask';
import { v1 as uuid } from 'uuid';


function TaskCard(){
    const { taskId } = useParams();
    const  singleTask = tasksData.find((iterator)=>Number(taskId) ===iterator.id)
    const [notes, setNotes] = useState(singleTask.notes);
    const [title, setTitle] = useState(singleTask.task);
    const [subTasks, setSubTasks] = useState(singleTask.subtasks)
    useEffect(()=>{
        setNotes(singleTask.notes);
        setTitle(singleTask.task);
    },[singleTask])

    const editNotes =(val)=>{
        setNotes(val);
    }

    const editTitle = (val)=>{
        setTitle(val);
    }
    const handleRemoveSubtask = (subId) =>{
        setSubTasks(subTasks.filter((st)=> st.id !== subId))
    }
    return (
        <div className="taskcard">
            <div className="taskcard-trail">
                <p>My Lists {'>'} {singleTask.list}</p>
            </div>

            <input type='text' value={title} onChange={(e)=>editTitle(e.target.value)} className="name" />

            {/* <div className="bubbles"></div> */}

            <div className="notes">
                <h5>NOTES</h5>
                <input type="text" placeholder='Insert your notes here' onChange={(e)=>editNotes(e.target.value)} value={notes}/>                
            </div>

            {singleTask.subtasks && 
            <div className="subtasks">
                <h5>Subtasks</h5>
                {subTasks.map((subtask)=>(
                    <SubTask key={uuid()} subtask={subtask} isDone={false} removeSubtask={handleRemoveSubtask}/>
                ))}
            </div>}

            <div className="attachments"></div>
        </div>
    )
}

export default TaskCard;