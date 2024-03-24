import './App.css';
import TaskApp from './components/TaskApp/TaskApp';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TaskList from './components/TaskList/Tasklist';
import TaskCard from './components/TaskCard/Taskcard';
import NextSevenDays from './components/NextSevenDays/NextSevenDays';
import { StateValue } from './StateProvider';
import ListCard from './components/ListCard/ListCard';
import { useEffect } from 'react';
import axios from 'axios';



const router = createBrowserRouter([
  {
    path:'/',
    element: <TaskApp/>,
    children:[
      {
        path: 'all-tasks',
        element: <TaskList tasks={StateValue}/>,
        children: [
          {
            path: ':taskId',
            element: <TaskCard/>
          }
        ]
      },
      {
        path: 'next-seven-days',
        element: <NextSevenDays/>
      },
      {
        path: ':list',
        element: <ListCard/>,
        children: [
          {
            path: ':taskId',
            element: <TaskCard/>
          }
        ]
      }      
    ]
  }
])


export default function App(){
  //eslint-disable-next-line
  const [data, dispatch] = StateValue();

  useEffect(()=>{
    const fetchTasks = async () =>{
      await axios.get('/api/data')
      .then((res)=>{
        dispatch({
          type: 'setData',
          tasks: res.data.tasks,
          lists: res.data.lists
        })
      })
      .catch((error)=>{
        console.log(error)
      })
    };
    fetchTasks();
  },[dispatch])


  return (
    data && <div className="App">
      <RouterProvider router={router}/>
    </div>)
}


