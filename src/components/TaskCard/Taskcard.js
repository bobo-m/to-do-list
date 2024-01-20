import './Taskcard.css';
import tasksData from '../../tasks';


function Taskcard({task}){
    const task = tasksData.map((iterator)=>{
        if(iterator.id === task.id){
            return iterator;
        }
    })
    return (
        <div className="taskcard">
            <div className="taskcard-trail"></div>
            <div className="name"></div>
            <div className="bubbles"></div>
            <div className="notes"></div>
            <div className="subtasks"></div>
            <div className="attachments"></div>
        </div>
    )
}

export default Taskcard;