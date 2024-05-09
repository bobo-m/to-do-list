import React from 'react';
import './Profile.css'
import SettingsIcon from '@mui/icons-material/Settings';
import { useAuthContext } from '../../hooks/useAuthContext';

function Profile({sidebarStatus, handleSidebarToggle}){
    const { user } = useAuthContext();

    const handleClick=()=>{
        handleSidebarToggle(!sidebarStatus);
    }
    return (
        <div id='settings'>
            <button onClick={handleClick} className="settings-icon">
                <SettingsIcon sx={{fontSize: 30, color:'white'}}/>
            </button>
            {sidebarStatus && <p className="username">{user.firstName} {user.lastName}</p>}
        </div>
    )
}

export default Profile;