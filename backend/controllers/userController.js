import { User } from "../models/userModel.js";
import { List } from "../models/listModel.js";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// login a user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        // create token
        const token = createToken(user._id);
        res.status(200).json({email, token});
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
};

const signupUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.signup(email, password);
        const token = createToken(user._id);

        await List.createDefaults(user._id);

        res.status(200).json({email, token});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export { 
    loginUser, 
    signupUser 
};