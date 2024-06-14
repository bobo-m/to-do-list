import { useState } from 'react';
import { usePopper } from 'react-popper';
import { StateValue } from '../../context/StateProvider'
import { useAuthContext } from '../../hooks/useAuthContext';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import './List.css';

const List = ({list}) => {

  const { user } = useAuthContext();

  const [menuOpen, setMenuOpen] = useState(false);
  const [,dispatch] = StateValue();

  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start',
  });

  const toggleMenu = (e) => {
    e.preventDefault();
    setMenuOpen(!menuOpen);
  }

  const closeMenu = (e) => {
    const popper = document.querySelector('.listOptions');
    if(popper && !popper.contains(e.target)){
      setMenuOpen(false);
    }
  }

  const deleteList = async () => {
    if(!user){
      return;
    }
    try{  
      dispatch({
        type: 'deleteList',
        id: list._id,
        name: list.name
      })
      setMenuOpen(false);
      
      await axios.delete('https://task-manager-xsxw.onrender.com/api/tasks/list', {
        headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
        },
        data: {
            id: list._id,
            name: list.name
        }
      });
    }catch(error){
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log('Error: ', error);
      };
    };
  }
  return(
    <>
      <li className="myLists-list">
        <h3 className="list-item--name">
          {list.name}
        </h3>
        <button 
          onClick={toggleMenu} 
          className='myLists-list-options'
          ref={setReferenceElement}>
        <MoreVertIcon sx={{color: 'white'}}/>
        </button>
      </li>
      {menuOpen && 
      <div onClick={closeMenu} className="popperWrapper">
        <div 
          ref={setPopperElement} 
          className="listOptions"
          style={styles.popper}
          {...attributes.popper}>
          <ul>
            <li>
              <button onClick={deleteList} className="deleteList-button">
                Delete List
              </button>
            </li>
          </ul>
        </div>
      </div>
      }
    </>
  );
};

export default List;