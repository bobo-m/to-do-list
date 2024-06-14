import express from 'express';
import { 
    getData, 
    createTask,
    deleteTask,
    editTaskNotes,
    editTaskTitle,
    setTaskDone,
    toggleMyDay,
    addList,
    deleteList,
    saveTags,
    editDeadline    
} from '../controllers/taskController.js';
import { Auth } from '../middleware/Auth.js';

const router = express.Router();

router.use(Auth);

router.get('/', getData);

router.post('/', createTask);

router.delete('/', deleteTask);  

router.put('/notes', editTaskNotes);

router.put('/done', setTaskDone);

router.put('/title', editTaskTitle);

router.put('/myday', toggleMyDay);

router.put('/list', addList);

router.delete('/list', deleteList);

router.put('/tags', saveTags);

router.put('/deadline', editDeadline);

export { router as taskRoutes};