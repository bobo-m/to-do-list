import { useEffect, useMemo, useState } from 'react'
import Header from '../Header/Header'
import DayTaskList from '../DayTaskList/DayTaskList';
import { StateValue } from '../../context/StateProvider'
import { parse, differenceInCalendarDays } from 'date-fns';
import './NextSevenDays.css';
import { Outlet } from 'react-router-dom';

const NextSevenDays = () => {
    // eslint-disable-next-line
    const [{tasks}, dispatch] = StateValue()
    const [categorizedTasks, setCategorizedTasks] = useState({
        Sunday: {date:'',tasks:[]},
        Monday: {date:'',tasks:[]},
        Tuesday: {date:'',tasks:[]},
        Wednesday: {date:'',tasks:[]},
        Thursday: {date:'',tasks:[]},
        Saturday: {date:'',tasks:[]},
        Friday: {date:'',tasks:[]},
    });

    const daysMap = useMemo(()=>new Map([
        [0, 'Sunday'],
        [1, 'Monday'],
        [2, 'Tuesday'],
        [3, 'Wednesday'],
        [4, 'Thursday'],
        [5, 'Friday'],
        [6, 'Saturday']
    ]),[])
    const date = useMemo(()=>new Date(),[]);

    useEffect(() => {
        const dateToday = new Date()
        const categorized = tasks.reduce(
            (acc, task)=>{
                if(task.deadline){    
                    const deadline = parse(task.deadline, 'yyyy-MM-dd', new Date())
                    const dateOffset = differenceInCalendarDays(deadline, dateToday)
                    if(dateOffset < 7){
                        acc[daysMap.get(deadline.getDay())].tasks.push(task)
                    }
                }
                return acc          
            },
            {
                Sunday: {date:'',tasks:[]},
                Monday: {date:'',tasks:[]},
                Tuesday: {date:'',tasks:[]},
                Wednesday: {date:'',tasks:[]},
                Thursday: {date:'',tasks:[]},
                Friday: {date:'',tasks:[]},
                Saturday: {date:'',tasks:[]}
            }
        )
        for (const [key] of daysMap) {
            let daysOffset =  key - date.getDay()
            if(daysOffset < 0) daysOffset=7+daysOffset
            const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()+daysOffset);
            categorized[daysMap.get(key)].date = `${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDate()}`
        }
        setCategorizedTasks(categorized)
        },[date, daysMap, tasks]
    )

    return (
        <div className="next-sevenDays">
            <Header icon={'next-7-days'} text={'Next 7 Days'}/>
            <div className="sevenDays-body">
                {[0,1,2,3,4,5,6].map((offsetDate)=>(
                    <DayTaskList   
                        optional={offsetDate < 2 ? offsetDate === 0 ? 'Today' : 'Tomorrow' : null}
                        key={offsetDate} 
                        day={(daysMap.get((date.getDay()+offsetDate)%7))} 
                        tasks={categorizedTasks[(daysMap.get((date.getDay()+ offsetDate)%7))].tasks}
                        date={categorizedTasks[(daysMap.get((date.getDay()+ offsetDate)%7))].date}
                    />
                ))}
            </div>
            <Outlet/>
        </div>
    );    
}

export default NextSevenDays;