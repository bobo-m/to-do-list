import { Outlet } from 'react-router-dom';
import './TaskList.css';
import TaskTitle from '../TaskTitle/TaskTitle';
import AddTask from '../AddTask/AddTask';
import { useEffect, useState } from 'react';
import {v1 as uuid } from 'uuid'

export default function TaskList({ tasks }){
    const[taskList, setTaskList] = useState(tasks);
    const [categorizedTasks, setCategorizedTasks] = useState({
        today: [],
        tomorrow: [],
        upcoming: [],
        someday: [],
    });
    const addTask=({
        task, timeline , deadline, list
    })=>{
        setTaskList([
            ...taskList,
            {
                id: uuid(),
                task: task,
                timeline: timeline ? timeline : 'Someday',
                deadline: deadline ? deadline : null,
                list : list !== '' ? list : null,
                subtasks: null,
                notes: ''
            }
        ])
    }

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
    return(
        <>
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
            <div className="addtask-container">
                <AddTask handleAddTask={addTask}/>
            </div>
        </div>
        <Outlet/>
        </>
    )
}