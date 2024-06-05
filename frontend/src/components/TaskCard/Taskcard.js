import './TaskCard.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SubTask from '../SubTask/SubTask';
import AddSubTask from '../AddSubTask/AddSubTask'
import NewSubTask from '../NewSubTask/NewSubTask';
import DateSelection from '../DateSelection/DateSelection';
import TagSelection from '../TagSelection/TagSelection';
import ListSelection from '../ListSelection/ListSelection';
import { StateValue } from '../../context/StateProvider';
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from 'axios';
import TagIcon from '@mui/icons-material/Tag';
import { ReactComponent as ListIcon } from '../../images/all-tasks.svg';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { tagColors } from '../../constants/constants';

function TaskCard(){
    const { taskId } = useParams();
    const [{tasks: tasksData}, dispatch] = StateValue(); 
    const { user } = useAuthContext();

    const [dateSelection, setDateSelection] = useState(false);
    const [tagSelection, setTagSelection] = useState(false);
    const [listSelection, setListSelection] = useState(false);

    // eslint-disable-next-line
    const singleTask = tasksData.find((iterator)=> taskId == iterator.id) 
        || tasksData.find((task)=> task.timeline==='Today') 
        || tasksData.find((task)=> task.timeline==='Tomorrow')
        || tasksData.find((task)=> task.timeline==='Upcoming')
        || tasksData.find((task)=> task.timeline==='Someday')

    const defaultNotes = singleTask?.notes || '';
    const defaultTitle = singleTask?.title || '';
    const defaultSubTasks = singleTask?.subtasks || [];
    
    const [notes, setNotes] = useState(defaultNotes);
    const [title, setTitle] = useState(defaultTitle);
    const [subTasks, setSubTasks] = useState(defaultSubTasks);
    const [subtaskInputOpen, setSubtaskInputOpen] = useState(false);


    useEffect(()=>{
        setNotes((prevNotes) => singleTask?.notes || prevNotes);
        setTitle((prevTitle) => singleTask?.title || prevTitle);
        setSubTasks((prevSubTasks) => singleTask?.subtasks || prevSubTasks)
    },[singleTask])

    const editNotes = async (val)=>{
        if(!user){
            return;
        };

        try {
            await axios.put('https://task-manager-xsxw.onrender.com/api/tasks/notes', {
                id: singleTask.id,
                notes: val
            },{
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            
            dispatch({
                type: 'editTaskNotes',
                task: {
                    id: singleTask.id,
                    notes: val
                }
            });

            setNotes(val);
        } catch (error) {
            if(error.response){
                console.log(error.response.data);
            }else{
                console.log('Error: ', error);
            };
        };
    };

    const editTitle = async (val)=>{
        if(!user){
            return;
        };

        try {
            await axios.put('https://task-manager-xsxw.onrender.com/api/tasks/title', {
                id: singleTask.id,
                title: val
            },{
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
    
            dispatch({
                type: 'editTaskTitle',
                task: {
                    title: val,
                    id: singleTask.id
                }
            });
            
            setTitle(val);
        } catch (error) {
            if(error.response){
                console.log(error.response.data);
            }else{
                console.log('Error: ', error);
            };
        };
    };

    const handleRemoveSubtask = (subId) =>{
        console.log(singleTask.id, subId);
        dispatch({
            type: 'removeSubtask',
            id: subId,
            parentTask: singleTask.id
        })
    }

    return (
        <>
        {singleTask &&
            <div className="taskcard">
            <div className="taskcard-trail">
                <p>My Lists {'>'} {singleTask.list}</p>
            </div>

            <input type='text' value={title} onChange={(e)=>editTitle(e.target.value)} className="name" />

            <div className="bubbles">
                <div className="reminderBubble">
                    <button onClick={() => setDateSelection(true)}>
                        <NotificationsNoneIcon sx={{color: '#ff6168', fontSize: '20px'}}/>
                        Reminder
                    </button>
                </div>

                <div className="listBubble">
                    <button onClick={() => setListSelection(true)}>
                        <ListIcon/>
                        {singleTask.list}
                    </button>
                </div>
                <div 
                    className={`tagBubbles ${singleTask.tags && singleTask.tags.length === 0? '': 'nextLine'}`}
                    onClick={() => setTagSelection(true)}
                >
                    {(singleTask.tags && singleTask.tags.length === 0) ? 
                        <button>
                            <TagIcon sx={{color: '#0083ff'}}/>Tags
                        </button>:
                        <>
                        {singleTask.tags.map((tag)=>(
                            <button key={tag} className='tag' style={{backgroundColor: tagColors.get(tag)}}>
                                {tag}
                            </button>
                        ))}
                        <AddCircleOutlineIcon/>
                        </>
                        }
                </div>
            </div>

            <div className="notes">
                <h5>NOTES</h5>
                <textarea type="text" placeholder='Insert your notes here' onChange={(e)=>editNotes(e.target.value)} value={notes}/>                
            </div>

            
            <div className="subtasks">
                <h5>Subtasks</h5>
                {subTasks && <>
                    {subTasks.map((subtask)=>(
                        <SubTask key={subtask.id} parentTask={singleTask} subtask={subtask} removeSubtask={handleRemoveSubtask}/>
                    ))}
                    </>
                }
                {
                    subtaskInputOpen && <NewSubTask parentTask={singleTask} setSubtaskInputOpen={setSubtaskInputOpen}/>
                }
                <AddSubTask subtaskInputOpen={subtaskInputOpen} showNewSubTaskInput={setSubtaskInputOpen}/>
            </div>

            <div className="attachments"></div>
        </div>
    }
        {dateSelection &&
            <DateSelection 
                taskId={taskId} 
                taskDeadline={singleTask.deadline} 
                setDateSelection={setDateSelection}
            />
        }
        {tagSelection && 
            <TagSelection 
                taskId={taskId} 
                tags={singleTask.tags} 
                setTagSelection={setTagSelection}
            />
        }
        {listSelection && 
            <ListSelection 
                taskId={taskId} 
                taskList={singleTask.list} 
                setListSelection={setListSelection}
            />
        }
        </>
    )
}

export default TaskCard;