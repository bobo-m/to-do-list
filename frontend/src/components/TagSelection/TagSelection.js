import { useState } from 'react';
import { StateValue } from '../../context/StateProvider';
import { useAuthContext } from '../../hooks/useAuthContext';
import DoneIcon from '@mui/icons-material/Done';
import { tagsList } from "../../constants/constants";
import axios from "axios";
import './TagSelection.css';

const TagSelection = ({taskId, tags ,setTagSelection, setNewTags}) => {
  const [checkedTags, setCheckedTags] = useState(tags);
  const [,dispatch ] = StateValue();
  const { user } = useAuthContext();

  const closeTagMenu = (e) => {
    e.stopPropagation();
    const tagMenu = document.querySelector('.tagSelection');
    if(tagMenu && !tagMenu.contains(e.target)){
      setTagSelection(false);
    }
  }

  const toggleCheckbox = (tagName) => {
    if(checkedTags.includes(tagName)){
      const newTags = checkedTags.filter((item) => item !== tagName);
      setCheckedTags(newTags);
    } else {
      setCheckedTags([...checkedTags, tagName]);
    };
  };

  const saveTags = async () => {
    if(!user){
      return;
    }

    try{
      await axios.put('/https://task-manager-xsxw.onrender.comapi/tasks/tags', {
        id: taskId,
        tags: checkedTags
      },{
        headers: {
          Authorization: `Bearer ${user.token}`,
        }
      });
      dispatch({
        type: 'saveTags',
        id: taskId,
        tags: checkedTags
      });
      setTagSelection(false);
    }catch(error){
      if(error.response){
        console.log(error.response.data);
      } else {
        console.log('Error: ', error);
      }
    };
  };

  const selectTags = () =>{
    setNewTags(checkedTags);
    setTagSelection(false);
  }

  return(
    <div className="tagSelectionWrapper" onClick={(e)=> closeTagMenu(e)}>
      <div className="tagSelection">
        <div className="tagSelection-header">
          <h4>Tags</h4>
        </div>
        <div className="tagSelection-list">
          {tagsList.map((text) => {
            const tag = text.split(' ')[0];
            const color = text.split(' ')[1];
            return(
              <div key={tag}>
                <span
                  className={`tagSelection-item`} 
                  style={{backgroundColor: color}}
                >
                  <button
                    style={{backgroundColor: checkedTags.includes(tag) ? 'white':'transparent'}} 
                    onClick={() => toggleCheckbox(tag)} 
                    value={tag}
                  >
                    {checkedTags.includes(tag) ? <DoneIcon sx={{color: `${color}`}}/> : null}
                  </button>
                  {tag}
                </span>
              </div>
            );
          })}
        </div>
        <div className="tagSelection-footer">
          <button className='cancel-button' onClick={() => setTagSelection(false)}>Cancel</button>
          <hr/>
          <button className='saveTags-button' onClick={!setNewTags ? saveTags : selectTags}>Save</button>
        </div>
      </div>
    </div>
  )
};

export default TagSelection;
