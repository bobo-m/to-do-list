import 'dotenv/config.js';

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { taskRoutes } from './routes/tasks.js';
import { subtaskRoutes } from './routes/subtasks.js';
import { userRoutes } from './routes/user.js';

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.use('/api/tasks', taskRoutes);
app.use('/api/tasks/subtasks', subtaskRoutes);
app.use('/api/user', userRoutes);

mongoose.connect(process.env.DB_URI)
.then(()=>{
    app.listen(port,()=>{
        console.log(`http://localhost:${port}`);
    })
});