import './Task.css'

function Task({name, isDone}){
    return(
        <div className="task">
            <button className="checkbox">
                
            </button>
            <p className='task-description'>{name}</p>
        </div>
    )
}

export default Task;