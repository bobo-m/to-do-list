import 'dotenv/config.js';
import { MongoClient } from 'mongodb';


const client = new MongoClient(process.env.DB_URI);

const connectToDb = async () => {
    try{
        await client.connect();
        return client.db("todolist");
    } catch(error) {
        console.log(error)
        process.exit(1)
    }
}

export default connectToDb;