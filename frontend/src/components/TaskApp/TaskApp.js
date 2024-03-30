import SideBar from '../SideBar/SideBar';
// import Tasklist from './components/Tasklist';
import './TaskApp.css';
import { Outlet } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';

function TaskApp() {
  const { logout } = useLogout();
  return (
    <div className="TaskApp">
      <SideBar/>
      <main id='main'>
        <button className='logout' onClick={logout}>
          Log Out
        </button>
        <Outlet/>          
      </main>
    </div>
  );
}

export default TaskApp;
