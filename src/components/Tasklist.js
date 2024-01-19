import { Outlet } from 'react-router-dom';
import './Tasklist.css';
import Tasktitle from './Tasktitle';

export default function Tasklist(){
    return(
        <>
        <div className="tasklists">
            <div className='tasklist tasklist-today'>
                <Tasktitle name='today' />
            </div>
            <div className="tasklist tasklist-tomorrow">
                <Tasktitle name='tomorrow' />
            </div>
            <div className="tasklist tasklist-upcoming">
                <Tasktitle name='upcoming' />
            </div>
            <div className="tasklist tasklist-someday">
                <Tasktitle name='someday' />
            </div>
        </div>
        <Outlet/>
        </>
    )
}