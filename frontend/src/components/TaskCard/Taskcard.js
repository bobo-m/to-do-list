import './TaskCard.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SubTask from '../SubTask/SubTask';
import AddSubTask from '../AddSubTask/AddSubTask'
import NewSubTask from '../NewSubTask/NewSubTask';
import { StateValue } from '../../StateProvider';
import axios from 'axios';

function TaskCard(){
    const { taskId } = useParams();
    const [{tasks: tasksData}, dispatch] = StateValue(); 
    // eslint-disable-next-line
    const singleTask = tasksData.find((iterator)=> taskId == iterator.id) 
        || tasksData.find((task)=> task.timeline==='Today') 
        || tasksData.find((task)=> task.timeline==='Tomorrow')
        || tasksData.find((task)=> task.timeline==='Upcoming')
        || tasksData.find((task)=> task.timeline==='Someday')

    const defaultNotes = singleTask?.notes || '';
    const defaultTitle = singleTask?.task || '';
    const defaultSubTasks = singleTask?.subtasks || [];
    
    const [notes, setNotes] = useState(defaultNotes);
    const [title, setTitle] = useState(defaultTitle);
    const [subTasks, setSubTasks] = useState(defaultSubTasks);
    const [subtaskInputOpen, setSubtaskInputOpen] = useState(false);


    useEffect(()=>{
        setNotes((prevNotes) => singleTask?.notes || prevNotes);
        setTitle((prevTitle) => singleTask?.task || prevTitle);
        setSubTasks((prevSubTasks) => singleTask?.subtasks || prevSubTasks)
    },[singleTask])

    const editNotes = async (val)=>{
        setNotes(val);
        
        await axios.put('/api/tasks/notes', {
            id: singleTask.id,
            notes: val
        })

        dispatch({
            type: 'editTaskNotes',
            task: {
                id: singleTask.id,
                notes: val
            }
        })
    }

    const editTitle = async (val)=>{
        setTitle(val);

        await axios.put('/api/tasks/task', {
            id: singleTask.id,
            task: val
        })

        dispatch({
            type: 'editTaskTitle',
            task: {
                task: val,
                id: singleTask.id
            }
        })
    }
    const handleRemoveSubtask = (subId) =>{
        dispatch({
            type: 'removeSubtask',
            id: subId,
            parentTask: singleTask.id
        })
    }

    return (
        <>
        {singleTask &&
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

            
            <div className="subtasks">
                <h5>Subtasks</h5>
                {subTasks && <>
                    {subTasks.map((subtask)=>(
                        <SubTask key={subtask.id} parentTask={singleTask} subtask={subtask} removeSubtask={handleRemoveSubtask}/>
                    ))}
                    </>
                }
                {
                    subtaskInputOpen && <NewSubTask parentTask={singleTask} setSubtaskInputOpen={setSubtaskInputOpen}/>
                }
                <AddSubTask subtaskInputOpen={subtaskInputOpen} showNewSubTaskInput={setSubtaskInputOpen}/>
            </div>

            <div className="attachments"></div>
        </div>}
        </>
    )
}

export default TaskCard;