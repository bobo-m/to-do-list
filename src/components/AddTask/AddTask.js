import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { ReactComponent as MyListIcon } from '../../images/all-tasks.svg';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import TagIcon from '@mui/icons-material/Tag';
import './AddTask.css'
import { useEffect, useState } from 'react';

function AddTask({handleAddTask}){
    const [task, setTask] = useState('')
    const [focused, setFocused] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [showListSelect, setShowListSelect] = useState(false);
    const [selectedList, setSelectedList] = useState('')

    useEffect(()=>{
        if(focused){
            const timerID = setTimeout(()=>{
                setShowOptions(true);
            },200);
            return () => clearInterval(timerID);
        }else{
            setShowOptions(false)
        }
    },[focused])

    const openListSelect =()=>{
        setShowListSelect(!showListSelect);
    }
    const handleChange = (e) =>{
        e.preventDefault();
        setTask(e.target.value)
    }
    const addTask = (e) =>{

        if(e.key === 'Enter'){
            handleAddTask({
            task: task,
            list: selectedList
            })
            setTask('')
        }        
    }
    return(
        <>
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
                    onBlur={()=>setFocused(false)} 
                    onChange={(e)=> handleChange(e)}
                    onKeyPress={(e)=>addTask(e)} 
                    type="text" 
                    placeholder='Add Task' 
                    className="addtask-input" 
                    value={task}/>
                {focused &&
                    <div className="submit-icon">
                        <ArrowUpwardIcon/>
                    </div> 
                }
            </div> 
        </div>
        </>
    )
}

export default AddTask;