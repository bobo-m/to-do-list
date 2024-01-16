import './Tasklist.css';

export default function Tasklist(){
    return(
        <div className="tasklist">
            <div className="tasks today">
                <h3>Today</h3>
            </div>
            <div className="tasks tomorrow">
                <h3>Tomorrow</h3>
            </div>
            <div className="tasks upcoming">
                <h3>Upcoming</h3>
            </div>
            <div className="tasks someday">
                <h3>Someday</h3>
            </div>
        </div>
    )
}