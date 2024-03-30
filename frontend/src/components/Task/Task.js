import { useState } from 'react';
import './Task.css';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CancelIcon from '@mui/icons-material/Cancel';
import { StateValue } from '../../context/StateProvider';
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from 'axios';

function Task({name, id, isDone, removeTask}){
    const navigate = useNavigate();

    // eslint-disable-next-line
    const [tasks, dispatch] = StateValue();
    const [done, setDone] = useState(isDone);
    const [menuOpen, toggleMenu] = useState(false);
    const { user } = useAuthContext();

    const handleClick = async (e) =>{
        e.stopPropagation();
        if(!user){
            return;
        }
        try {
            await axios.put('/api/tasks/done', {
                id: id,
                isDone : !done
            },{
                headers:{
                    Authorization: `Bearer ${user.token}`
                }
            });
            
            dispatch({
                type: 'setTaskDone',
                id: id,
                isDone: isDone
            });

            setDone(!done);
        } catch (error) {
            if(error.response){
                console.log(error.response.data);
            }else{
                console.log('Error: ', error);
            };
        };
    };
    const handleRemove = async (id) =>{
        if(!user){
            return;
        };
        try {
            await axios.delete('/api/tasks',{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`
                },
                data: {
                    id: id
                }
            });
            
            removeTask(id);
        } catch (error) {
            if(error.response){
                console.log(error.response.data);
            }else{
                console.log('Error: ', error);
            };
        };
    };
    const handleUtility = (e) =>{
        e.stopPropagation();
        done ? handleRemove(id) : openUtilityMenu();
    }
    const openUtilityMenu = () =>{
        toggleMenu(!menuOpen);
    }
    const showTask = () =>{
        navigate(`./${id}`)
    }
    return(        
        <div className={`task ${done? 'done': ''}`} onClick={showTask}>
            <button onClick={(e)=>handleClick(e)} className="checkbox">
                {done && <CheckCircleIcon style={{color : 'white'}}/>}
            </button>
            <p className='task-description'>
                <span className={`isChecked ${done? 'isChecked--true' :''}`}></span>
                {name}
            </p>
            <button onClick={(e)=>handleUtility(e)} className={`task-utility ${done ? 'utility-remove' : 'utility-options'}`}>
                {done 
                    ? <CancelIcon style={{color:'white'}}/> 
                    : <MoreVertIcon style={{color:'white'}}/>}
            </button>
        </div>
    )
}

export default Task;