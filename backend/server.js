import express from 'express';
import connectToDb from './db.js';

const port = process.env.PORT || 5000;

const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const startServer = async () =>{
    // Connect to the db asynchronously
    const db = await connectToDb();
    
    // Get the task and list collections for CRUD operations

    const taskCollection = db.collection("tasks")
    const listCollection = db.collection("lists")

    // Defining express application routes for CRUD operations 

    // GET route to get the tasks and list data from the database
    app.get('/api/data', async (req,res)=>{
        // Get the data from the database and convert them to arrays
        const tasks = await taskCollection.find().toArray();
        const lists = await listCollection.find().toArray();
        
        // Initialize single object container to hold both arrays
        const data = {
            tasks: tasks,
            lists: lists
        }
        // Send the data back as reponse
        res.json(data);
    })

    // Delete a task
    app.delete('/api/tasks', async (req,res)=>{

        // Get the task from the body of the post request
        const {id} = req.body

        // Delete the task from the collection
        const result = await taskCollection.deleteOne({id : id});

        // Send corresponding status and message
        if(result.deletedCount === 1){
            res.status(200).json({msg : "task successfully deleted"})
        }else{
            res.status(404).json({msg : "Unsuccesful, task not found"})
        }
    })

    // Add a task
    app.post('/api/tasks', async (req, res)=>{
        // Get the task from the body of the post request
        const { newTask } = req.body;

        // Insert the received task into the tasks collection in the database
        const result = await taskCollection.insertOne(newTask);

        // Send a message in the response with the id of the inserted document
        res.status(200).json({msg: `A document was inserted with the _id: ${result.insertedId}`})
    })
    
    // Edit task notes
    app.put('/api/tasks/notes', async (req, res)=>{
        // Get the task id and notes from the request body
        const { id, notes } = req.body

        // Use task id to filter out the task to be edited
        const filter = {
            id: id
        }

        // Use update opertor to specify new notes of the task that is matched
        const updateTask = {
            $set: {
                notes: notes
            }
        }

        // Update the task in the db and send corresponding status and messages
        await taskCollection.updateOne(filter, updateTask)
        .then(()=>{
            res.status(200).json({msg: 'Task successfully updated'})
        })
        .catch((error)=>{
            res.status(500).json({msg: 'Internal server error'})
        })
    })

    // Edit task title
    app.put('/api/tasks/task', async (req, res)=>{

        // Get the task id and notes from the request body
        const { id, task } = req.body

        // Use task id to filter out the task to be edited
        const filter = {
            id: id
        }

        // Use update opertor to specify new notes of the task that is matched
        const updateTask = {
            $set: {
                task: task
            }
        }

        // Update the task in the db and send corresponding status and messages
        await taskCollection.updateOne(filter, updateTask)
        .then(()=>{
            res.status(200).json({msg: 'Task successfully updated'})
        })
        .catch((error)=>{
            res.status(500).json({msg: 'Internal server error'})
        })
    })

    // Set the task to show its done 
    app.put('/api/tasks/done', async (req, res)=>{
        // Get the task id and the it is done or not
        const { id, isDone } = req.body

        // Use the task id as a filter to find the task in the collection
        const filter = {
            id: id
        }

        // Initialize the updated task with the new isDone property using $set update operator 
        const updateTask = {
            $set: {
                isDone: isDone
            }
        }

        // Update the task with the isDone field and send the corresponding status codes and responses
        await taskCollection.updateOne(filter, updateTask)
        .then(()=>{
            res.status(200).json({msg: 'Task successfully updated'})
        })
        .catch((error)=>{
            res.status(500).json({msg: 'Internal server error'})
        })
    })

    // Add a subtask to a parent task
    app.put('/api/tasks/subtasks', async (req, res)=>{
        // Get the parent task id and the subtask to be added
        const { parentTask, subtask } = req.body;

        // Initialize a filter to find the parent task in the collection
        const filter = {
            id : parentTask
        }

        // Specify the update to push the subtask to the subtasks property
        const updateSubtask = {
            $push: {
                subtasks: subtask
            }
        }

        const result = await taskCollection.updateOne(filter, updateSubtask)

        res.status(200).json({msg: `Subtask added`})
    })

    // Delete a given subtask
    app.delete('/api/tasks/subtasks', async (req, res)=>{
        // Get the parent task id and the subtask id to be removed
        const { parentTask, subtask } = req.body;

        // Use the parent task id as filter to find the task
        const filter = {
            id : parentTask
        }

        // Use $pull update operator to remove the specified subtask from an array of subtasks
        const updateSubtask = {
            $pull: {
                subtasks: {
                    id: subtask
                }
            }
        }

        // Update the task collection to remove the subtask and send corresponding status
        await taskCollection.updateOne(filter, updateSubtask)
        .then(()=>{
            res.status(200).json({msg: 'Subtask Removed Successfully'})            
        })
        .catch((error)=>{
            res.status(500).json({msg: `Internal Server Error: ${error}`})
        })
    })

    // Edit subtask title 
    app.put('/api/tasks/subtasks/task', async (req, res)=>{
        // Get the parent task id and the subtask from the request body
        const { parentTaskId, subtask } = req.body

        // Set filter using the parent task id and the subtask id to find the subtask
        const filter = {
            id: parentTaskId,
            "subtasks.id": subtask.id 
        }

        // Set the updated subtask using the array update operator '$' to update the first
        // subtask found with the id in the subtask array
        const updateSubtask = {
            $set: {
                "subtasks.$.task" : subtask.task
            }
        }

        // Update the subtask and send corresponding status and messages
        await taskCollection.updateOne(filter, updateSubtask)
        .then(()=>{
            res.status(200).json({msg: 'Subtask Updated Successfully'})
        })
        .catch((error)=>{
            res.status(500).json({msg: 'Internal Server Error'})
        })
    })

    // Set a subtask as done
    app.put('/api/tasks/subtasks/done', async (req, res)=>{
        // Get the id of the parent task and the subtask to be updated from the request body
        const { parentTaskId, subtask} = req.body

        // Use parent task id to find the task and subtask id to filter for the relevant subtask 
        const filter =  {
            id: parentTaskId,
            "subtasks.id" : subtask.id
        }
        // Set the isDone property of the first matching subtask using $ opertor 
        const updateSubtask = {
            $set: {
                "subtasks.$.isDone": subtask.isDone
            }
        }

        // Update the subtask and send the corresponding status and messages
        await taskCollection.updateOne(filter, updateSubtask)
        .then(()=>{
            res.status(200).json({msg: 'Subtask Updated Successfully'})
        })
        .catch((error)=>{
            res.status(500).json({msg: 'Internal Server Error'})
        })
        
    })

    // Listen on the port for any requests
    app.listen(port,()=>{
        console.log(`Port running on http://localhost:${port}/api/data`)
    })
}

startServer();

