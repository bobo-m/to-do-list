import CloseIcon from '@mui/icons-material/Close';
import TaskCard from '../TaskCard/Taskcard';
import './TaskEditor.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TaskEditor = () =>{
    const navigate = useNavigate()
    const handleNavigate = (e)=>{
        e.preventDefault()
        const taskCard = document.querySelector('.taskcard')
        if(!taskCard.contains(e.target)){
            navigate('/next-seven-days')
        }
    }
    return (
        <div className="task-editor" onClick={(e)=>handleNavigate(e)}>
            <TaskCard/>
        </div>
    )
}

export default TaskEditor;