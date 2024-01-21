import './TaskCard.css';
import tasksData from '../../tasks';
import { useParams } from 'react-router-dom';


function TaskCard(){
    const { taskId } = useParams();
    const  singleTask = tasksData.find((iterator)=>Number(taskId) ===iterator.id)
    return (
        <div className="taskcard">
            <div className="taskcard-trail">{singleTask.list}</div>
            <div className="name">{singleTask.task}</div>
            <div className="bubbles"></div>
            <div className="notes">{singleTask.notes}</div>
            <div className="subtasks"></div>
            <div className="attachments"></div>
        </div>
    )
}

export default TaskCard;