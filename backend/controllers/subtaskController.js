import { Task } from '../models/taskModel.js';

const createSubtask = async (req, res) => {
    const { parentTaskId, subtask } = req.body;
    console.log(parentTaskId, subtask);
    const filter = {
        id: parentTaskId,
    };
    const updateSubtask = {
        $push: {
            subtasks: subtask
        }
    };
    try{
        await Task.updateOne(filter, updateSubtask).then((result)=>console.log(result));
        res.status(200).json({message: 'Subtask added successfully'});
    }catch(error){
        res.status(500).json({error: error.message});
    }
};

const deleteSubtask = async (req, res) => {
    const { parentTaskId, subtaskId } = req.body;
    const filter = {
        id: parentTaskId
    };  
    const updateSubtask = {
        $pull: {
            subtasks: { id: subtaskId }
        }
    };
    try{
        await Task.updateOne(filter, updateSubtask).then((result)=>console.log('deleted', result));
        res.status(200).json({message: 'Subtask removed successfully'});
    }catch(error){
        res.status(500).json({error: error.message});
    }
};

const editSubtaskTitle = async (req, res) => {
    const { parentTaskId, subtask } = req.body;

    const filter = {
        id: parentTaskId,
        'subtasks.id': subtask.id
    };
    const updateSubtask = {
        $set: {
            'subtasks.$.title': subtask.title
        }
    };
    try{
        await Task.updateOne(filter, updateSubtask).then((result)=>console.log(result));
        res.status(200).json({message: 'Subtask title updated successfully'});
    }catch(error){  
        res.status(500).json({error: error.message});
    }
};

const setSubtaskDone = async (req, res) => {
    const { parentTaskId, subtask } = req.body;
    const filter = {
        id: parentTaskId,
        'subtasks.id': subtask.id
    };
    const updateTask = {
        $set: {
            'subtasks.$.isDone': subtask.isDone
        }
    };
    try{
        await Task.updateOne(filter, updateTask).then((result)=>console.log(result));
        res.status(200).json({message: 'Task updated successfully'});
    }catch(error){
        res.status(500).json({error: error.message});
    }
};

export { 
    createSubtask, 
    deleteSubtask, 
    editSubtaskTitle, 
    setSubtaskDone 
};