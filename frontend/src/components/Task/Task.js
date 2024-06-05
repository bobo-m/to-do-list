import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePopper } from 'react-popper';
import { StateValue } from '../../context/StateProvider';
import { useAuthContext } from '../../hooks/useAuthContext';

import ListSelection from '../ListSelection/ListSelection';
import TagSelection from '../TagSelection/TagSelection';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CancelIcon from '@mui/icons-material/Cancel';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import TagIcon from '@mui/icons-material/Tag';
import axios from 'axios';
import './Task.css';

function Task({ task, removeTask }) {
    const navigate = useNavigate();

    // eslint-disable-next-line
    const [tasks, dispatch] = StateValue();
    const [done, setDone] = useState(task.isDone);
    const [menuOpen, toggleMenu] = useState(false);
    const [listSelection, setListSelection] = useState(false);
    const [tagSelection, setTagSelection] = useState(false);
    const { user } = useAuthContext();

    // popper hooks
    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: 'bottom-start',
        strategy: 'fixed'
    });

    const handleClick = async (e) => {
        e.stopPropagation();
        if (!user) {
            return;
        }
        try {
            await axios.put('https://task-manager-xsxw.onrender.com/api/tasks/done', {
                id: task.id,
                isDone: !done
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });

            dispatch({
                type: 'setTaskDone',
                id: task.id,
                isDone: task.isDone
            });

            setDone(!done);
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
            } else {
                console.log('Error: ', error);
            };
        };
    };
    const handleRemove = async (id) => {
        if (!user) {
            return;
        };
        try {
            await axios.delete('https://task-manager-xsxw.onrender.com/api/tasks', {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    "Content-Type": "application/json",
                },
                data: {
                    id: id
                }
            });

            removeTask(id);
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
            } else {
                console.log('Error: ', error);
            };
        };
    };
    const handleUtility = (e) => {
        e.stopPropagation();
        console.log('propagation stopped')
        done ? handleRemove(task.id) : openUtilityMenu(e);
    }
    const openUtilityMenu = (e) => {
        toggleMenu(!menuOpen);
    }

    const closeMenu = (e) => {
        console.log('close menu')
        e.stopPropagation();
        const popper = document.querySelector('.optionsDropdown');
        if (popper && !popper.contains(e.target)) {
            toggleMenu(false);
        }
    }
    const toggleMyDay = async () => {
        if (!user) {
            return;
        };

        try {
            await axios.put('https://task-manager-xsxw.onrender.com/api/tasks/myday', {
                id: task.id,
                myDay: task.myDay
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            dispatch({
                type: 'toggleMyDay',
                id: task.id,
                myDay: task.myDay
            });
            toggleMenu(false);
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
            } else {
                console.log('Error: ', error);
            };
        };

    }

    const showListSelection = () => {
        setListSelection(true);
        toggleMenu(false);
    }

    const showTagSelection = () => {
        setTagSelection(true);
        toggleMenu(false);
    }

    const showTask = () => {
        navigate(`./${task.id}`)
    }
    return (
        <div className={`task ${done ? 'done' : ''}`} onClick={showTask}>
            <button onClick={(e) => handleClick(e)} className="checkbox">
                {done && <CheckCircleIcon style={{ color: 'white' }} />}
            </button>
            <p className='task-description'>
                <span className={`isChecked ${done ? 'isChecked--true' : ''}`}>
                </span>
                {task.title}
            </p>
            <button
                onClick={(e) => handleUtility(e)}
                className={`task-utility ${done ? 'utility-remove' : 'utility-options'}`}
                ref={setReferenceElement}
            >
                {done
                    ? <CancelIcon style={{ color: 'white' }} />
                    : <MoreVertIcon style={{ color: 'white' }} />}
            </button>
            {menuOpen && <div className='popperWrapper' onClick={(e) => closeMenu(e)}>
                < div
                    ref={setPopperElement}
                    className={`optionsDropdown ${menuOpen ? 'optionsDropdown--open' : ''}`}
                    style={styles.popper}
                    {...attributes.popper}
                >
                    <ul>
                        <li>
                            <button onClick={toggleMyDay}>
                                {
                                    task.myDay ? <img src='/icons/my-day-striked.svg' alt='' /> : <img src='/icons/my-day.svg' alt='' />
                                }
                                {
                                    task.myDay ? 'Remove from My Day' : 'Add to My Day'
                                }
                            </button>
                        </li>
                        <li>
                            <button>
                                <NotificationsNoneIcon />
                                Reminder
                            </button>
                        </li>
                        <li>
                            <button onClick={showListSelection}>
                                <img src='/icons/all-tasks.svg' alt='' />
                                Lists
                            </button>
                        </li>
                        <li>
                            <button onClick={showTagSelection}>
                                <TagIcon />
                                Tags
                            </button>
                        </li>
                    </ul>
                </div>
            </div>}
            {listSelection && <ListSelection taskId={task.id} taskList={task.list} setListSelection={setListSelection}/>}
            {tagSelection && <TagSelection taskId={task.id} tags={task.tags} setTagSelection={setTagSelection}/>}
        </div>
    )
}

export default Task;