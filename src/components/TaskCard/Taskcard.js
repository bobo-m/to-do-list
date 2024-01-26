import './TaskCard.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SubTask from '../SubTask/SubTask';
import { v1 as uuid } from 'uuid';
import { useOutletContext } from 'react-router-dom';
import AddSubTask from '../AddSubTask/AddSubTask'
import NewSubTask from '../NewSubTask/NewSubTask';

function TaskCard(){
    const { taskId } = useParams();
    const [tasksData] = useOutletContext();
    // eslint-disable-next-line
    const  singleTask = tasksData.find((iterator)=> taskId == iterator.id)
    const [notes, setNotes] = useState(singleTask.notes);
    const [title, setTitle] = useState(singleTask.task);
    const [subTasks, setSubTasks] = useState(singleTask.subtasks);
    const [subtaskInputOpen, setSubtaskInputOpen] = useState(false);


    useEffect(()=>{
        setNotes(singleTask.notes);
        setTitle(singleTask.task);
        setSubTasks(singleTask.subtasks)
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

    const handleAddSubtask = (st) =>{
        setSubTasks([
            ...subTasks,
            {
                id: uuid(),
                task: st
            }
        ])
        setSubtaskInputOpen(false);
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

            
            <div className="subtasks">
                <h5>Subtasks</h5>
                {subTasks && <>
                    {subTasks.map((subtask)=>(
                        <SubTask key={uuid()} subtask={subtask} isDone={false} removeSubtask={handleRemoveSubtask}/>
                    ))}
                    </>
                }
                {
                    subtaskInputOpen && <NewSubTask addNewSubtask={handleAddSubtask}/>
                }
                <AddSubTask subtaskInputOpen={subtaskInputOpen} showNewSubTaskInput={setSubtaskInputOpen}/>
            </div>

            <div className="attachments"></div>
        </div>
    )
}

export default TaskCard;