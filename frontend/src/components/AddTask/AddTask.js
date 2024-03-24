import { ReactComponent as MyListIcon } from '../../images/all-tasks.svg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { v1 as uuid } from 'uuid';
import { format } from 'date-fns'
import TagIcon from '@mui/icons-material/Tag';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import './AddTask.css'

function AddTask({ handleAddTask }){
    const [task, setTask] = useState('')
    const [focused, setFocused] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [showListSelect, setShowListSelect] = useState(false);
    const [selectedList, setSelectedList] = useState('')

    const handleWindowClick=(e)=>{
        const addTaskElement = document.querySelector('.addtask-container');
        if(addTaskElement && !addTaskElement.contains(e.target)){
            setFocused(false);
            setShowListSelect(false)
        }
    }

    useEffect(()=>{
        if(focused){
            window.addEventListener('click', handleWindowClick)
            const timerID = setTimeout(()=>{
                setShowOptions(true);
            },200);
            return () => clearTimeout(timerID);
        }else{
            window.removeEventListener('click', handleWindowClick)
            setShowOptions(false)
        }
    },[focused])
     
    const openListSelect =()=>{
        setShowListSelect(!showListSelect);
    }
    const handleChange = (e) =>{
        setTask(e.target.value)
    }
    const addTask = (e) =>{

        if(e.key === 'Enter'){
            dispatchAddTask();
        }        
    }
    const dispatchAddTask= async ()=>{
        const id = uuid();
        const deadline = format(Date.now(), 'yyyy-MM-dd');
        const newTask = {
            id:id,
            task: task,
            list: selectedList ? selectedList : 'Personal',
            timeline: "Today",
            deadline: deadline,
            notes: '',
            priority: "Medium",
            subtasks: null,  
            isDone: false
        }
        await axios.post('/api/tasks', { newTask: newTask })
        handleAddTask(newTask)
        setTask('');
    }
    return(
        <div className='addtask-container'>
        {showListSelect && 
            <div className="select-mylists">
                <ul >
                    <li>
                        <button onClick={()=>setSelectedList('Personal')} value={'Personal'}>Personal</button>
                    </li>
                    <li>
                        <button onClick={()=>setSelectedList('Work')} value='Work'>Work</button>
                    </li>
                    <li>
                        <button onClick={()=>setSelectedList('Grocery List')} value='Grocery List'>Grocery List</button>
                    </li>
                </ul>
            </div>
        }
        <div className={`addtask ${focused? 'focused ':''}`}>

            {showOptions && 
                <div className='addtask-options'>
                    <button onClick={openListSelect} className='addtask-options-mylists'>
                        {selectedList !== '' ? selectedList:<MyListIcon/>}
                    </button>
                    <hr/>
                    <button className="addtask-options-reminder">
                        <NotificationsOutlinedIcon style={{fontWeight:'300'}}/>
                    </button>
                    <hr/>
                    <button className='addtask-options-tags'>
                        <TagIcon style={{fontWeight:'300'}}/>
                    </button>
                </div>
            }
            <div className="addtask-input-container">
                {!focused && <div className="addtask-icon">
                    <AddOutlinedIcon/>
                </div>}
                <input 
                    onFocus={()=>setFocused(true)}  
                    onChange={(e)=> handleChange(e)}
                    onKeyDown={(e)=>addTask(e)} 
                    type="text" 
                    placeholder='Add Task' 
                    className="addtask-input" 
                    value={task}/>
                {focused &&
                    <div className="submit-icon" onClick={dispatchAddTask}>
                        <ArrowUpwardIcon/>
                    </div> 
                }
            </div> 
        </div>
        </div>
    )
}

export default AddTask;