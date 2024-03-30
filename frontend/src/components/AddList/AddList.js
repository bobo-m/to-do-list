import { useState } from 'react'
import './AddList.css'
import { StateValue } from '../../context/StateProvider'
import { v1 as uuid } from 'uuid'

const AddList = ({ closeAddList }) => {
    // eslint-disable-next-line
    const [state, dispatch] = StateValue()
    const [value, setValue] = useState('')

    const handleChange = (val) => {
        setValue(val)
    }
    const addList = () => {
        dispatch({
            type: 'addList',
            list: {
                id: uuid(),
                name: value
            }
        })
        setValue('')
        closeAddList(false)
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