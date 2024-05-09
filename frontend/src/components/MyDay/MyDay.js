import './MyDay.css';
import { daysMap, monthsMap } from '../../constants/constants.js';
import { StateValue } from '../../context/StateProvider.js';
import AddTask from '../AddTask/AddTask.js';
import Task from '../Task/Task.js';

const MyDay = () => {
  const [tasks, dispatch] = StateValue();
  const date = new Date();
  
  const addTask = (task) => {
    dispatch({
        type: 'addTask',
        task: task
    })
  }

  const removeTask = (id) =>{
    dispatch({
      type: 'removeTask',
      id: id
    });
  };
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
            <p className="myDay-day-day">
              {daysMap.get(date.getDay())}
            </p>
            <p className="myDay-day-date">
              {date.getDate()}
            </p>
            <p className="myDay-day-month">
              {monthsMap.get(date.getMonth())}
            </p>
          </div>
          <div className="eventSummary">

          </div>
        </div>
        <div className="taskSection">
          <div className="taskDisplay">
            {tasks.tasks.map((t,i)=>{
              return <Task key={i} name={t.title} id={t.id} isDone={t.isDone} removeTask={removeTask}/>
            })}
          </div>
          <AddTask handleAddTask={addTask}/>
        </div>
      </div>
    </div>
  );
};

export default MyDay;