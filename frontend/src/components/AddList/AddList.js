import { useState } from 'react'
import './AddList.css'
import { StateValue } from '../../context/StateProvider'
import { useAuthContext } from '../../hooks/useAuthContext'
import axios from 'axios'

const AddList = ({ closeAddList }) => {
    // eslint-disable-next-line
    const [state, dispatch] = StateValue()
    const [value, setValue] = useState('')

    const { user } = useAuthContext();

    const handleChange = (val) => {
        setValue(val)
    }
    const addList = async() => {
        if(!user){
            return;
        }
        try{
            dispatch({
                type: 'addList',
                list: {
                    name: value
                }
            });
            setValue('')
            closeAddList(false)
            await axios.put('https://task-manager-xsxw.onrender.com/api/tasks/list',{
                list: value
            },{
                headers:{
                    Authorization: `Bearer ${user.token}`
                }
            });
        }catch(error){
            if(error.response){
                console.log(error.response.data);
            }else{
                console.log(error)
            }
        }
    }
    const hideAddListClose=(e)=>{
        const addListElement = document.querySelector('.addlist')
        if(!addListElement.contains(e.target)){
            closeAddList(false)
        }
    }
    return (
        <div className="addlist-container" onClick={(e)=>hideAddListClose(e)}>
            <div className="addlist">
                <input 
                    type="text" 
                    className='addlist-input' 
                    placeholder='Add a list title' 
                    value={value} 
                    onChange={(e)=>handleChange(e.target.value)}
                />
                <button 
                    className='addlist-button' 
                    disabled={value === '' ? true : false}
                    onClick={addList} 
                >
                    Continue
                </button>
            </div>
        </div>
    )
}

export default AddList;