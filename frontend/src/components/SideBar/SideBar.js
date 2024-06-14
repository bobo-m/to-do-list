import Profile from '../Profile/Profile.js';
import ListItem from '../ListItem/ListItem';
import AddList from '../AddList/AddList';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css';
import { StateValue } from '../../context/StateProvider';
import List from '../List/List.js';
import { useAuthContext } from '../../hooks/useAuthContext.js';

function SideBar() {
    const [isSidebarOpen, toggleSidebarOpen] = useState(true);
    const [addListOpen, toggleAddList] = useState(false)
    // eslint-disable-next-line
    const [{ lists }, dispatch] = StateValue();

    const { user } = useAuthContext();

    const addList = () => {
        toggleAddList(!addListOpen)
    }

    return (
        <>
            <div className={`sidebar ${isSidebarOpen ? 'open' : 'collapsed'}`}>
                <Profile
                    name={user.name}
                    sidebarStatus={isSidebarOpen}
                    handleSidebarToggle={toggleSidebarOpen}
                />
                {isSidebarOpen && <>
                    <ul className='summary'>
                        <Link to='my-day'>
                            <li className="summary-myDay">
                                <ListItem
                                    icon='my-day'
                                    title='My Day'
                                    count={0}
                                />
                            </li>
                        </Link>
                        <Link to='next-seven-days'>
                            <li className="summary-next7Days">
                                <ListItem
                                    icon='next-7-days'
                                    title='Next 7 Days'
                                    count={0}
                                />
                            </li>
                        </Link>

                        <Link to='all-tasks'>
                            <li className="summary-allTasks">
                                <ListItem
                                    icon='all-tasks'
                                    title='All Tasks'
                                    count={0}
                                />
                            </li>
                        </Link>
                    </ul>
                    <ul className="myLists">
                        <li id='myLists-heading'>
                            <ListItem
                                icon='lock'
                                title='My Lists'
                                count={0}
                            />
                            <i className='addlist-icon' onClick={addList}>
                                <AddOutlinedIcon />
                            </i>
                        </li>
                        {lists && lists.map((list, index) => {
                            const link = list.name.toLowerCase().replace(/\s+/, '-');
                            return (
                                <Link to={link} key={index}>
                                    <List list={list}/>
                                </Link>
                            )
                        })}
                    </ul>
                </>}
            </div>
            {addListOpen &&
                <AddList closeAddList={toggleAddList} />
            }
        </>
    )
}

export default SideBar;