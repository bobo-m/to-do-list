import { Outlet } from 'react-router-dom';
import './TaskList.css';
import TaskTitle from '../TaskTitle/TaskTitle';
import AddTask from '../AddTask/AddTask';
import { useEffect, useState } from 'react';
import { StateValue } from '../../context/StateProvider';
import Header from '../Header/Header';

export default function TaskList(){
    // eslint-disable-next-line
    const[{tasks : taskList}, dispatch] = StateValue();
    const [categorizedTasks, setCategorizedTasks] = useState({
        today: [],
        tomorrow: [],
        upcoming: [],
        someday: [],
    });
    
    useEffect(()=>{
        const categorized = taskList.reduce(
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
        );
        setCategorizedTasks(categorized);
    },[taskList])

    const addTask = (task) => {
        dispatch({
            type: 'addTask',
            task: task
        })
    }

    return(
        <>
        <Header icon={'all-tasks'} text={'All Tasks'}/>
        <div className='allTasks'>
            <div className='tasklists-wrapper'>
                <div className="tasklists">
                    <div className='tasklist taklist-today'>
                        <TaskTitle name='today' tasks={categorizedTasks.today}/>
                    </div>
                    <div className="tasklist tasklist-tomorrow">
                        <TaskTitle name='tomorrow' tasks={categorizedTasks.tomorrow}/>
                    </div>
                    <div className="tasklist tasklist-upcoming">
                        <TaskTitle name='upcoming' tasks={categorizedTasks.upcoming}/>
                    </div>
                    <div className="tasklist tasklist-someday">
                        <TaskTitle name='someday' tasks={categorizedTasks.someday}/>
                    </div>
                </div>
                <AddTask handleAddTask={addTask}/> 
            </div>
            <Outlet context={taskList}/>
        </div>
        </>
    )
}