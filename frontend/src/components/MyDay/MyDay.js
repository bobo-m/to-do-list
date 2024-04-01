import './MyDay.css';

const MyDay = () =>{
    return (
        <div className="myDayWrapper">
            <div className="myDay">
                <h2 className="greeting">
                    Good Evening Bob
                </h2>
                <h2 className="quote">
                    Run the day or the day will run you
                </h2>
                <div className="eventsOverview">
                    <div className="myDay-day">
                        30 March SAT
                    </div>
                    <div className="eventSummary">

                    </div>
                </div>
                <div className="tasksDisplay">

                </div>
            </div>
        </div>
    );
};

export default MyDay;