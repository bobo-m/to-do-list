import { StateValue } from "../../context/StateProvider";
import { useAuthContext } from "../../hooks/useAuthContext";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';
import './ListSelection.css';

const ListSelection = ({ taskId, taskList, setListSelection }) => {
  const [{ lists }, dispatch] = StateValue();
  const { user } = useAuthContext();

  const handleClick = (e) => {
    const listSelectionMenu = document.querySelector('.listSelection-list');
    if(listSelectionMenu && !listSelectionMenu.contains(e.target)){
      setListSelection(false);
    }
  }

  const selectList = async (listName) => {
    if(taskList === listName || !user){
      return;
    }

    try{
      await axios.put('https://task-manager-xsxw.onrender.com/api/tasks/list',{
        id: taskId,
        list: listName
      },{
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
    }catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log('Error: ', error);
      };
    }

    dispatch({
      type: 'setTaskList',
      id: taskId,
      list: listName
    })

    setListSelection(false);
  }  

  return (
    <div className="listSelectionWrapper" onClick={(e) => handleClick(e)}>
      <div className="listSelection">
        <div className="listSelection-header">
          <h4>Move to ...</h4>
        </div>
        <div className="listSelection-list">
          {lists.map((list) => (
            <div key={list._id}>
            <button 
              className={`listSelection-${list.name}`} 
              value={`${list.name}`}
              onClick={(e) => selectList(e.target.value)}
            >
              {list.name}
              {taskList === list.name && <CheckCircleIcon style={{ color: '#04AA6D' }} />}
            </button>
            <hr />
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default ListSelection;