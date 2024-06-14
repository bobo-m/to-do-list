import { useState } from 'react'; 
import { useAuthContext } from '../../hooks/useAuthContext'
import { StateValue } from '../../context/StateProvider';
import Calendar from 'react-calendar';
import { format, isPast, parse } from 'date-fns';
import axios from 'axios';
import './DateSelection.css';

const DateSelection = ({taskId, taskDeadline, setDateSelection, setNewDeadline}) => {
  const [date, setDate] = useState(new Date(taskDeadline));
  const [time, setTime] = useState(new Date(taskDeadline));

  const [,dispatch] = StateValue();
  const { user } = useAuthContext();

  const formattedDate = format(date, 'dd.MM.yyyy');
  const formattedTime = format(time, 'hh:mm a'); 

  const [tempTime, setTempTime] = useState(formattedTime);
  const [tempDate, setTempDate] = useState(formattedDate);

  const closeDateSelection = (e) => {
    const dateSelection = document.querySelector('.dateSelection');
    if(dateSelection && !dateSelection.contains(e.target)){
      setDateSelection(false);
    };
  }

  const mergeDateTime = (date1, date2) => {
    const year = date1.getFullYear();
    const month = date1.getMonth();
    const day = date1.getDate();

    const hours = date2.getHours();
    const minutes = date2.getMinutes();

    const newDate = new Date(year, month, day, hours, minutes);

    return newDate;
  }

  const handleCalendarChange = (calendarDate) => {
    const newDate = mergeDateTime(calendarDate, time);
    setDate(newDate);
    setTime(newDate);
    setTempDate(format(newDate, 'dd.MM.yyyy'));
  }

  const handleDateChange = (inputDate) => {
    try{
      const parsedDate = parse(inputDate.replace(/[!@#$%^&*\-+/\\:,]+/g, '.'), 'dd.MM.yyyy', new Date());
      const newDate = mergeDateTime(parsedDate, time);
      if(isPast(newDate)){
        throw new Error('Invalid Date');
      }
      console.log(newDate);
      setTempDate(format(newDate, 'dd.MM.yyyy'));
      setDate(newDate);
    }catch(err){
      console.log(err);
      setTempDate(format(date, 'dd.MM.yyyy'));
    }
  }

  const handleTimeChange = (inputTime) => {
    try{
      const parsedTime = parse(inputTime, 'hh:mm a', new Date());
      const newTime = mergeDateTime(date, parsedTime);
      console.log(newTime);
      if(isPast(newTime)){
        throw new Error('Invalid Time');
      }
      setTempTime(format(newTime, 'hh:mm a'));
      setTime(newTime);
    }catch(err){
      console.log(err);
      setTempTime(format(time, 'hh:mm a'));
    }
  }

  const handleDateFormSubmit = (e) => {
    const inputDate = e.target[0].value;
    console.log(e, inputDate);
    e.preventDefault();
    handleDateChange(inputDate);
  };

  const handleTimeFormSubmit = (e) => {
    const inputTime = e.target[0].value;
    console.log(inputTime);
    e.preventDefault();
    handleTimeChange(inputTime);
  };

  const editDeadline = async () => {
    if(!user){
      return;
    }
    const newDeadline = mergeDateTime(date, time);
    try{
      await axios.put('https://task-manager-xsxw.onrender.com/api/tasks/deadline',{
        id: taskId,
        deadline: newDeadline,
      },{
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      dispatch({
        type: 'saveDate',
        id: taskId,
        deadline: newDeadline
      })
      setDateSelection(false);
    }catch(error){
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log('Error: ', error);
      };
    }
  }

  const setDeadline = () => {
    const newDeadline = mergeDateTime(date, time);
    setNewDeadline(newDeadline);
    setDateSelection(false);
  }

  return(
    <div className="dateSelectionWrapper" onClick={closeDateSelection}>
      <div className="dateSelection">
        <div className="dateSelection-header">
          <h4>Reminder</h4>
        </div>
        <div className="dateSelection-body">
          <div className="dateTimeSelectionInput">
            <span className="dateSelectionInputContainer">
              <form onSubmit={e => handleDateFormSubmit(e)}>
                <label>DATE</label>
                <input 
                  className="dateSelectionInput" 
                  type="text" 
                  value={tempDate} 
                  onChange={e => setTempDate(e.target.value)}
                  onBlur={e => handleDateChange(e.target.value)}
                  />
              </form>
            </span>

            <span className="timeSelectionInputContainer">
              <form onSubmit={e => handleTimeFormSubmit(e)}>
                <label>TIME</label>
                <input 
                  className="timeSelectionInput" 
                  type="text"
                  value={tempTime}
                  onChange={e => setTempTime(e.target.value)}
                  onBlur={e => handleTimeChange(e.target.value)}
                  />
              </form>
            </span>
          </div>
          <div className="dateSelection-calendar">
            <Calendar 
              value={date} 
              onChange={(date) => handleCalendarChange(date)}
              minDate={new Date()}
              next2Label={null}
              prev2Label={null}
            />
          </div>
        </div>
        <div className="dateSelection-footer">
          <button className='cancelDate-button' onClick={() => setDateSelection(false)}>
            Cancel
          </button>
          <hr/>
          <button className="saveDate-button" onClick={setNewDeadline ? setDeadline : editDeadline}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default DateSelection;