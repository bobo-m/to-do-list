import SideBar from './components/SideBar';
// import Tasklist from './components/Tasklist';
import './App.css';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <SideBar/>
      <main id='main'>
        <Outlet/>      
      </main>
    </div>
  );
}

export default App;
