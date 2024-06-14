import { Outlet } from 'react-router-dom';
import './TaskList.css';
import TaskTitle from '../TaskTitle/TaskTitle';
import AddTask from '../AddTask/AddTask';
import { useEffect, useState } from 'react';
import { StateValue } from '../../context/StateProvider';
import Header from '../Header/Header';
import { differenceInCalendarDays, isPast, isToday, isTomorrow } from 'date-fns';

export default function TaskList(){
    // eslint-disable-next-line
    const[{tasks : taskList}, dispatch] = StateValue();
    const [categorizedTasks, setCategorizedTasks] = useState({
        past:[],
        today: [],
        tomorrow: [],
        upcoming: [],
        someday: [],
    });
    
    useEffect(()=>{
        const categorized = taskList.reduce(
            (acc, task)=>{
                const date = task.deadline;
                if(isPast(date)){
                    acc.past.push(task)
                }else if(isToday(date)){
                    acc.today.push(task);
                }else if(isTomorrow(date)){
                    acc.tomorrow.push(task);
                }else if(differenceInCalendarDays(date, new Date()) < 7 && differenceInCalendarDays(date, new Date()) > 0){
                    acc.upcoming.push(task);
                }else{
                    acc.someday.push(task);
                }
                return acc;
            },
            {past:[], today:[], tomorrow:[], upcoming:[], someday:[]}
        );
        setCategorizedTasks(categorized);
    },[taskList])
    console.log(categorizedTasks)
    
    const addTask = (task) => {
        dispatch({
            type: 'addTask',
            task: task
        });
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
                    <div className='tasklist taklist-past'>
                        <TaskTitle name='past' tasks={categorizedTasks.past}/>
                    </div>
                </div>
                <AddTask handleAddTask={addTask} myDay={false}/> 
            </div>
            <Outlet context={taskList}/>
        </div>
        </>
    )
}