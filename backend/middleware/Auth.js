import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';

export const Auth = async (req, res, next) =>{

    // get the authorization header from the headers
    const { authorization } = req.headers;

    // If the authorization header does not exist send back an error
    if(!authorization){
        return res.status(401).json({ error: 'Authorization token required' });
    }

    try {
        // Split the header to get the token
        const token = authorization.split(' ')[1];

        // Verify the jwt token to get the id 
        const { _id } = jwt.verify(token, process.env.SECRET);

        // Find the user in the db and get the user id
        const user = await User.findOne({_id}).select('_id');

        // Set a property on the request to the user id
        req.user = user;

        // Pass the control to the next middleware
        next();
    } catch (error) {
        console.log(error);
        // Send error back if some error is encountered
        res.status(401).json({ error: 'Request is not authorized'});
    };
};