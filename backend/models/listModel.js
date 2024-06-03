import mongoose from "mongoose";

const schema = mongoose.Schema;

const listSchema = new schema({
    name:{
        type: String,
        unique: true,
        required: true
    },
    user_id:{
        type: String,
        required: true
    }
},{collection: 'lists'})

listSchema.statics.createDefaults = async function (user_id){
    const defaultLists = [
        {
            user_id,
            name: 'Personal'
        },
        {
            user_id,
            name: 'Work'
        },
        {
            user_id,
            name: 'Grocery List'
        }
    ];
    this.insertMany(defaultLists);
}

const listModel = mongoose.model('list', listSchema);

export { listModel as List};