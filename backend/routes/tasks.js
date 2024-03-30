import express from 'express';
import { 
    getData, 
    createTask,
    deleteTask,
    editTaskNotes,
    editTaskTitle,
    setTaskDone    
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

export { router as taskRoutes};