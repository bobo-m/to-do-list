import SideBar from '../SideBar/SideBar';
// import Tasklist from './components/Tasklist';
import './TaskApp.css';
import { Outlet } from 'react-router-dom';

function TaskApp() {
  return (
    <div className="TaskApp">
      <SideBar/>
      <main id='main'>
        <Outlet/>          
      </main>
    </div>
  );
}

export default TaskApp;
