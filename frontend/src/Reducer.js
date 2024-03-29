export const initialState = {
    lists: [],
    tasks: [],
}


const reducer = (state, action) =>{
switch(action.type){
    case 'setData':
        return{
            ...state,
            tasks: action.tasks,
            lists: action.lists,
        }
    case 'addTask':
        const task = {
            id: action.task.id,
            task: action.task.task,
            timeline: action.task.timeline,
            deadline: action.task.deadline,
            list : action.task.list,
            subtasks: null,
            notes: ''
        }
            return {
                ...state,
                tasks: [...state.tasks, task]
            }

    case 'removeTask':
        if(action.id){ 
            const updatedTasks = [...state.tasks].filter((task)=>task.id !== action.id)
            return{
                ...state,
                tasks: updatedTasks
            }
        }else{
            return{
                ...state
            }
        }
    
    case 'setTaskDone':
        if(action.id){
            const updatedTasks = [...state.tasks]
            const taskIndex = updatedTasks.findIndex((task)=> task.id === action.id)
            updatedTasks[taskIndex].isDone = (!action.isDone)      
            return{
                ...state,
                tasks: updatedTasks
            }
        }
        return{
            ...state
        }            

    case 'editTaskTitle':
        if(action.task){
            const taskIndex = state.tasks.findIndex((task)=> task.id === action.task.id)

            const updatedTasks = [
                ...state.tasks
            ]

            updatedTasks[taskIndex].task = action.task.task 

            return {
                ...state,
                tasks: updatedTasks
            }
        }
        return {
            ...state
        }
    
    case 'addSubtask':
    
        if(action.parentTask){
            const parentIndex = state.tasks.findIndex((task)=> task.id === action.parentTask)
        
        
        if(parentIndex !== -1){
            const parentTask = state.tasks[parentIndex]

            const subtask = {
                id: action.subtask.id,
                task: action.subtask.task
            }
            const newParentTask = {
                ...parentTask,
                subtasks: [...parentTask.subtasks , subtask]
            }

            const updatedTasks = [...state.tasks]
            updatedTasks[parentIndex] = newParentTask
        
        
            return{
                ...state,
                tasks: updatedTasks
            }
        }}
        return{
            ...state
        }

    case 'editSubtask':

        if(action.subtask.parentTask){
            const parentIndex = state.tasks.findIndex((task)=> task.id === action.subtask.parentTask)
            if(parentIndex !== -1){
                const subtaskIndex = state.tasks[parentIndex].subtasks.findIndex((task)=> task.id ===action.subtask.id)
                
                const updatedSubTasks = [
                    ...state.tasks[parentIndex].subtasks
                ]

                updatedSubTasks[subtaskIndex] = {
                    id: action.subtask.id,
                    task: action.subtask.task
                }

                const updatedTasks = [
                    ...state.tasks
                ]

                updatedTasks[parentIndex] = {
                    ...state.tasks[parentIndex],
                    subtasks: updatedSubTasks
                }

                return {
                    ...state,
                    tasks: updatedTasks
                }
            }
        }

        return{
            ...state
        }

    case 'removeSubtask':
        if(action.id){
            const updatedTasks = [...state.tasks]
            const parentIndex = updatedTasks.findIndex((task)=>task.id===action.parentTask)
            const subtaskIndex = updatedTasks[parentIndex].subtasks.findIndex((task)=>task.id===action.id)
            updatedTasks[parentIndex].subtasks.splice(subtaskIndex,1)
    
            return{
                ...state,
                tasks: updatedTasks
            }
        }
        return{
            ...state
        }
    
    case 'editTaskNotes':
        if(action.task){
            const taskIndex = state.tasks.findIndex((task)=> task.id === action.task.id)
            const updatedTasks = [...state.tasks]
            updatedTasks[taskIndex].notes = action.task.notes
    
            return {
                ...state,
                tasks: updatedTasks
            }
        }
    
        return {
            ...state
        }

    case 'addList':
        if(action.list){
            const updatedLists = [...state.lists, action.list]
            return {
                ...state,
                lists: updatedLists
            }
        }
        return {
            ...state
        }
        
    default:
        return {
            ...state
        }
}}

export default reducer;