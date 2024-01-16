import Profile from './Profile';
import  ListItem  from './ListItem';
import './SideBar.css';
import { useState } from 'react';


function SideBar (){
    const [isSidebarOpen, toggleSidebarOpen] = useState(true);
    return (
        <>
        <div className={`sidebar ${isSidebarOpen ? 'open' : 'collapsed'}`}>
            <Profile
                sidebarStatus={isSidebarOpen}
                handleSidebarToggle={toggleSidebarOpen}
            />
            {isSidebarOpen && <>
            <ul className='summary'>
                <li className="summary-myDay">
                    <ListItem
                        icon='my-day'
                        title='My Day'
                        count={0}
                    />
                </li>
                <li className="summary-next7Days">
                    <ListItem
                        icon='next-7-days'
                        title='Next 7 Days'
                        count={0}
                    />
                </li> 
               <li className="summary-allTasks">
                    <ListItem
                        icon='all-tasks'
                        title='All Tasks'
                        count={0}
                    />
                </li>
                <li className="summary-myCalender">
                    <ListItem
                        icon='my-calender'
                        title='My Calender'
                        count={0}
                    />
                </li>
            </ul>
            <ul className="myLists">
                <li id='myLists-heading'>
                    <ListItem
                        icon='lock'
                        title='My Lists'
                        count={0}
                    />
                </li>
                <li className="myLists-personal">
                    <ListItem
                        title='Personal'
                        count={0}
                    />
                </li>
                <li className="myLists-work">
                    <ListItem
                        title='Work'
                        count={0}
                    />
                </li>
                <li className="myLists-personal">
                    <ListItem
                        title='Personal'
                        count={0}
                    />
                </li>
                <li className='myLists-groceryList'>
                    <ListItem
                        title='Grocery List'
                        count={0}   
                    />
                </li>
            </ul>
            </>}
        </div> 
        </>
    )
}

export default SideBar;