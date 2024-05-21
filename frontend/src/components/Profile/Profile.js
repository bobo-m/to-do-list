import React from 'react';
import './Profile.css'
import SettingsIcon from '@mui/icons-material/Settings';

function Profile({sidebarStatus, handleSidebarToggle}){
    const handleClick=()=>{
        handleSidebarToggle(!sidebarStatus);
    }
    return (
        <div id='settings'>
            <button onClick={handleClick} className="settings-icon">
                <SettingsIcon sx={{fontSize: 30, color:'white'}}/>
            </button>
            {sidebarStatus && <p className="username">Bob Murmu</p>}
        </div>
    )
}

export default Profile;