import './TaskCard.css';
import tasksData from '../../tasks';
import { useParams } from 'react-router-dom';
import TaskTitle from '../TaskTitle/TaskTitle'
import { useState } from 'react';


function TaskCard(){
    const { taskId } = useParams();
    const  singleTask = tasksData.find((iterator)=>Number(taskId) ===iterator.id)
    const [notes, setNotes] = useState(singleTask.notes);
    const editNotes =(val)=>{
        setNotes(val);
    }
    return (
        <div className="taskcard">
            <div className="taskcard-trail">
                <p>My Lists {'>'} {singleTask.list}</p>
            </div>

            <div className="name">{singleTask.task}</div>

            {/* <div className="bubbles"></div> */}

            <div className="notes">
                <h5>NOTES</h5>
                <input type="text" onChange={(e)=>editNotes(e.target.value)} value={notes}/>                
            </div>

            {singleTask.subtasks && 
            <div className="subtasks">
                <TaskTitle isOpen={true} name='subtasks' tasks={singleTask.subtasks}/>
            </div>}

            <div className="attachments"></div>
        </div>
    )
}

export default TaskCard;