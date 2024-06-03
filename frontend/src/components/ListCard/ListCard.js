import { useEffect, useState } from 'react'
import { StateValue } from '../../context/StateProvider'
import Task from '../Task/Task'
import './ListCard.css'
import { Outlet, useParams } from 'react-router-dom'
import AddTask from '../AddTask/AddTask'

function ListCard () {
    const {list} = useParams()
    const [{tasks: tasksData}, dispatch] = StateValue()
    const [tasks, setTasks] = useState(tasksData.filter((t)=>{
        const lower = t.list.toLowerCase().replace(/\s+/g,'-')
        return lower === list
        })
    )

    useEffect(()=>{
        setTasks(tasksData.filter((t)=>{
            const lower = t.list.toLowerCase().replace(/\s+/g,'-')
            return lower === list
            }))
    },[list, tasksData])

    const handleRemove = (id) =>{
        dispatch({
            type: 'removeTask',
            id: id
        })
    }
    const addTask = (task) =>{
        dispatch({
            type: 'addTask',
            task: {
                task: task.task,
                list: task.list ? task.list : list
            }
        })
    }

    return(
        <div className='list-container'>
        <div className={`listcard ${list}`}>
            <div className="tasklists">
                {tasks.map((task)=>(
                    <Task
                        key={task.id}
                        task={task}
                        removeTask={handleRemove}
                    />
                ))}
            </div>
            <div className="addtask-container">
                <AddTask handleAddTask={addTask}/>
            </div>
        </div>
        <Outlet/>
        </div>
    )
}

export default ListCard