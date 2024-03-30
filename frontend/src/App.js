import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { StateValue } from './context/StateProvider';
import { useAuthContext } from './hooks/useAuthContext';
import { Navigate } from 'react-router-dom';
import TaskApp from './components/TaskApp/TaskApp';
import TaskList from './components/TaskList/Tasklist';
import TaskEditor from './components/TaskEditor/TaskEditor';
import TaskCard from './components/TaskCard/Taskcard';
import NextSevenDays from './components/NextSevenDays/NextSevenDays';
import ListCard from './components/ListCard/ListCard';
import MyDay from './components/MyDay/MyDay';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import axios from 'axios';
import './App.css';

export default function App(){
  //eslint-disable-next-line
  const [data, dispatch] = StateValue();
  const { user } = useAuthContext();

  useEffect(()=>{
    const fetchTasks = async () =>{
      try {
        const response = await axios.get('/api/tasks', {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        dispatch({
          type: 'SET_DATA',
          tasks: response.data.tasks,
          lists: response.data.lists
        });
      } catch (error) {
        if(error.response){
          console.log(error.response.data);
        }else if(error.request){
          console.log(error.request);
        }else{
          console.log('Error: ', error.message);
        };
      };
    };
    if(user){
      fetchTasks();
    }
  },[dispatch, user])

  const router = createBrowserRouter([
    {
      path:'/',
      element: user ? <TaskApp/>: <Login/>,
      children:[
        {
          path: 'my-day',
          element: <MyDay/>
        },
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
          element: <NextSevenDays/>,
          children: [
            {
              path: ':taskId',
              element: <TaskEditor/>
            }
          ]
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
    },
    {
      path: '/login',
      element: !user ? <Login/> : <Navigate to={'/'}/>
    },
    {
      path: '/signup',
      element: !user ? <Signup/> : <Navigate to={'/'}/>
    }
  ])

  return (
    data && <div className="App">
      <RouterProvider router={router}/>
    </div>
    )
}


