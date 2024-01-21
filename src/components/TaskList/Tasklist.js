import { Outlet } from 'react-router-dom';
import './TaskList.css';
import TaskTitle from '../TaskTitle/TaskTitle';

export default function TaskList({ tasks }){
    const {today , tomorrow, upcoming, someday}= tasks.reduce(
        (acc, task)=>{
            switch(task.timeline){
                case 'Today':
                    acc.today.push(task);
                    break;
                case'Tomorrow':
                    acc.tomorrow.push(task);
                    break;
                case 'Someday':
                    acc.someday.push(task);
                    break;
                case 'Upcoming':
                    acc.upcoming.push(task);
                    break;
                default:
                    break;
            }
            return acc;
        },
        {today:[], tomorrow:[], upcoming:[], someday:[]}
    )
    return(
        <>
        <div className="tasklists">
            <div className='tasklist tasklist-today'>
                <TaskTitle name='today' tasks={today}/>
            </div>
            <div className="tasklist tasklist-tomorrow">
                <TaskTitle name='tomorrow' tasks={tomorrow}/>
            </div>
            <div className="tasklist tasklist-upcoming">
                <TaskTitle name='upcoming' tasks={upcoming}/>
            </div>
            <div className="tasklist tasklist-someday">
                <TaskTitle name='someday' tasks={someday}/>
            </div>
        </div>
        <Outlet/>
        </>
    )
}