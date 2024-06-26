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

const toggleMyDay = async (req, res) => {
    const { id, myDay } = req.body;
    try{
        await Task.updateOne({id: id}, {myDay: !myDay});
        res.status(200).json({message: 'Task myDay updated successfully'});
    }catch(error){
        res.status(500).json({error: error.message});
    };
}

const addList = async (req, res) => {
    const { list } = req.body;
    const user_id = req.user._id;
    try{
        const newList = new List({name: list, user_id: user_id});
        await newList.save();
        res.status(200).json({message: 'List Created successfully'});
    }catch(error){
        res.status(500).json({error: error.message});
    }
};

const deleteList = async (req, res) => {
    const { id, name } = req.body;
    const user_id = req.user._id;
    try {
        List.findById(id)
        await List.findById(id).deleteOne();
        await Task.deleteMany({list: name, user_id});
        res.status(200).json({message: 'List deleted successfully'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const saveTags = async (req, res) => {
    const { id, tags } = req.body;
    try{
        await Task.updateOne({id: id}, {tags: tags});
        res.status(200).json({message: 'Task tags updated successfully'});
    }catch(error){
        res.status(500).json({error: error.message});
    };
};

const editDeadline = async (req, res) => {
    const { id, deadline } = req.body;
    try{
        await Task.updateOne({id: id}, {deadline: deadline});
        res.status(200).json({message: 'Task deadline updated successfully'});
    }catch(error){
        res.status(500).json({error: error.message})
    };
}

export {
    getData,
    createTask,
    deleteTask,
    editTaskTitle,
    editTaskNotes,
    setTaskDone,
    toggleMyDay,
    addList,
    deleteList,
    saveTags,
    editDeadline
}