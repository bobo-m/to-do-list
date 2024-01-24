import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { ReactComponent as MyListIcon } from '../../images/all-tasks.svg';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import TagIcon from '@mui/icons-material/Tag';
import './AddTask.css'
import { useState } from 'react';

function AddTask(){
    const [focused, setFocused] = useState(true);
    const addTask = () =>{

    }
    return(
        <div className="addtask">
            {focused && 
                <div className="addtask-options">
                    <button className='addtask-options-mylists'>
                        <MyListIcon/>
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
                <input onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} onSubmit={addTask} type="text" placeholder='Add Task' className="addtask-input" />
                {focused &&
                    <div className="submit-icon">
                        <ArrowUpwardIcon/>
                    </div> 
                }
            </div> 
        </div>
    )
}

export default AddTask;