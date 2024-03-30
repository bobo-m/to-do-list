import { Task } from "../models/taskModel.js";
import { List } from "../models/listModel.js";

const getData = async (req, res) => {
    const user_id = req.user._id;
    const tasks = await Task.find({ user_id });
    const lists = await List.find({ user_id });
    const data = { tasks, lists}
    res.json(data);
}

const createTask = async (req, res) => {
    const { task } = req.body;
    const user_id = req.user._id;
    try{
        const newTask = new Task({...task, user_id });
        await newTask.save();
        res.status(200).json({message: 'Task created successfully'});
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

const deleteTask = async (req, res) => {
    const { id } = req.body;
    try{    
        await Task.find({id: id}).deleteOne();
        res.status(200).json({message: 'Task deleted successfully'});
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

const editTaskNotes = async (req, res) => {
    const { id, notes } = req.body;
    try{
        await Task.updateOne({id: id}, {notes: notes});
        res.status(200).json({message: 'Task notes updated successfully'});
    }catch(error){  
        res.status(500).json({error: error.message});
    }
}

const setTaskDone = async (req, res) => {
    const { id, isDone } = req.body;
    try{
        await Task.updateOne({id: id}, {isDone: isDone});   
        res.status(200).json({message: 'Task updated successfully'});
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

const editTaskTitle = async (req, res) => {
    const { id, title } = req.body;
    try{
        await Task.updateOne({id: id}, {title: title});
        res.status(200).json({message: 'Task title updated successfully'});
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

export {
    getData,
    createTask,
    deleteTask,
    editTaskTitle,
    editTaskNotes,
    setTaskDone
}