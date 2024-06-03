import {v1 as uuid} from 'uuid'
import { StateValue } from '../../context/StateProvider';
import AddTask from '../AddTask/AddTask';
import Task from '../Task/Task';
import './DayTaskList.css'

const DayTaskList = ({ date, optional, day, tasks }) => {
    //eslint-disable-next-line
    const[state, dispatch] = StateValue()
    const addTask = (task)=>{
        dispatch({
            type: 'addTask',
            task: {
                ...task,
            }
        })
    }
    const removeTask = (id)=>{
        dispatch({
            type: 'removeTask',
            id: id
        })
    }
    return (
        <div className={`day-tasklist ${day}`}>
            <h3>{optional}     {day}</h3>
            {tasks.map((task)=>(
                <Task
                    key={uuid()}
                    task={task}
                    removeTask={removeTask}
                />
                
            ))}
            <AddTask  handleAddTask={addTask} date={date}/>
        </div>
    )
}

export default DayTaskList;
