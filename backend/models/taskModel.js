import mongoose from "mongoose";

const schema = mongoose.Schema;

const taskSchema = new schema({
    id:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    deadline:{
        type: String,
        required: true
    },
    timeline:{
        type: String,
        required: true
    },
    isDone:{
        type: Boolean,
        required: true
    },
    notes:{
        type: String,
        required: false
    },
    list:{
        type: String,
        required: true
    },
    subtasks:{
        type: Array,
        required: true
    },
    user_id:{
        type: String,
        required: true
    }
},{collection: 'tasks'});

const taskModel = mongoose.model('Task', taskSchema);

export { taskModel as Task };