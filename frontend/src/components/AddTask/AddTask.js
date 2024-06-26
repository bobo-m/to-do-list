import { ReactComponent as MyListIcon } from '../../images/all-tasks.svg';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from 'axios';
import { v1 as uuid } from 'uuid';
import TagIcon from '@mui/icons-material/Tag';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import './AddTask.css'
import { StateValue } from '../../context/StateProvider'
import DateSelection from '../DateSelection/DateSelection';
import TagSelection from '../TagSelection/TagSelection';

function AddTask({ handleAddTask , date, myDay}){
    const [title, setTitle] = useState('')
    const [focused, setFocused] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [showListSelect, setShowListSelect] = useState(false);
    const [selectedList, setSelectedList] = useState('');
    const { user } = useAuthContext();
    const [{lists}] = StateValue();

    const [tags, setTags] = useState([]);
    const [deadline, setDeadline] = useState(date ? date : new Date());

    const [dateSelection, setDateSelection] = useState(false);
    const [tagSelection, setTagSelection] = useState(false);

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

    const openDateSelect =()=>{
        setDateSelection(true);
    }

    const openTagSelect = () =>{
        setTagSelection(true)
    }
    const handleChange = (e) =>{
        setTitle(e.target.value)
    }
    const addTask = (e) =>{

        if(e.key === 'Enter'){
            dispatchAddTask();
        }        
    }
    const selectList = (listName) =>{
        setSelectedList(listName);
        setShowListSelect(false);
    }
    const dispatchAddTask= async ()=>{
        if(!user){
            return;
        }
        const id = uuid();
        const newTask = {
            id:id,
            title: title,
            list: selectedList ? selectedList : 'Personal',
            deadline: new Date(deadline),
            notes: '',
            subtasks: [],  
            isDone: false,
            myDay: myDay,
            tags: tags.length !== 0 ? tags : [],
        }
        setTags([]);
        setDeadline(date ? date : new Date());
        try {
            handleAddTask(newTask)
            setTitle('');
            await axios.post('https://task-manager-xsxw.onrender.com/api/tasks', { task: newTask }, {
                headers:{
                    Authorization: `Bearer ${user.token}`
                }
            })
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
                    {lists.map((l, index)=>(
                        <li key={index} onClick={()=>selectList(l.name)}>
                            <button value={l.name}>
                                {l.name}
                            </button>
                        </li>
                    ))}
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
                    <button onClick={openDateSelect} className="addtask-options-reminder">
                        <NotificationsOutlinedIcon style={{fontWeight:'300'}}/>
                    </button>
                    <hr/>
                    <button onClick={openTagSelect}  className='addtask-options-tags'>
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
        {dateSelection && <DateSelection taskDeadline={deadline} setDateSelection={setDateSelection} setNewDeadline={setDeadline}/>}
        {tagSelection && <TagSelection setTagSelection={setTagSelection} tags={tags} setNewTags={setTags}/>}
        </div>
    )
}

export default AddTask;