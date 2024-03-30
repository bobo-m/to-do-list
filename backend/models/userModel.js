import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from 'validator';

const schema = mongoose.Schema;

const userSchema = new schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
},{collection: 'users'})

// static signup method
userSchema.statics.signup = async function(email, password){
    if(!email || !password){
        throw new Error('All fields must be filled');
    };

    if(!validator.isEmail(email)){
        throw new Error('Email is not valid');
    };
    const exists = await this.findOne({ email:email });
    
    if(exists){
        throw new  Error('Email already in use');
    };

    if(!validator.isStrongPassword(password)){
        throw new Error('Please use a stronger password');
    };

    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hashedPassword});

    return user;
}

// static login method

userSchema.statics.login = async function(email, password){
    if(!email || !password){
        throw new Error('All fields must be filled');
    };

    const user = await this.findOne({ email:email });
    
    if(!user){
        throw new Error('Incorrect email');
    };
    
    const match = await bcrypt.compare(password, user.password);

    if(!match){
        throw new Error('Incorrect password');
    };

    return user;
}

const userModel = mongoose.model('User', userSchema);

export { userModel as User};