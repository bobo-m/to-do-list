import { ReactComponent as MyListIcon } from '../../images/all-tasks.svg';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from 'axios';
import { v1 as uuid } from 'uuid';
import { format } from 'date-fns'
import TagIcon from '@mui/icons-material/Tag';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { parse, isToday, isTomorrow, isThisMonth } from 'date-fns';
import './AddTask.css'

function AddTask({ handleAddTask , date}){
    const [title, setTitle] = useState('')
    const [focused, setFocused] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [showListSelect, setShowListSelect] = useState(false);
    const [selectedList, setSelectedList] = useState('');
    const { user } = useAuthContext();

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
        setTitle(e.target.value)
    }
    const addTask = (e) =>{

        if(e.key === 'Enter'){
            dispatchAddTask();
        }        
    }
    const dispatchAddTask= async ()=>{
        if(!user){
            return;
        }

        const id = uuid();
        const deadline = date? date :format(Date.now(), 'yyyy-MM-dd');
        const parsedDate = parse(deadline, 'yyyy-MM-dd', new Date()) ;  
        const newTask = {
            id:id,
            title: title,
            list: selectedList ? selectedList : 'Personal',
            timeline: 
                date ? 
                    isThisMonth(parsedDate) ?
                        isTomorrow(parsedDate) || isToday(parsedDate)? 
                            isTomorrow(parsedDate)? 
                            'Tomorrow' : 
                            'Today' :
                        'Upcoming' : 
                    'Someday': 
                'Today',
            deadline: deadline,
            notes: '',
            subtasks: [],  
            isDone: false
        }
        try {
            await axios.post('/api/tasks', { task: newTask }, {
                headers:{
                    Authorization: `Bearer ${user.token}`
                }
            })
            handleAddTask(newTask)
            setTitle('');
        } catch (error) {
            if(error.response){
                console.log(error.response.data);
            }else{
                console.log(error);
            }
        }
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
                    value={title}/>
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