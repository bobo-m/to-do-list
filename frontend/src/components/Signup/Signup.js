import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSignUp } from '../../hooks/useSignup';
import './Signup.css'

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const { signup, error, isLoading } = useSignUp();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log(email,password);
        await signup(firstName, lastName, email, password);
    }
    return (
        <div className="signupWrapper">
            <form className="signup" onSubmit={(e)=>handleSubmit(e)}>
                <h1>Sign Up</h1>
                <div className="firstNameWrapper">
                    <label>Enter First Name *</label>
                    <input 
                        className='firstName' 
                        type="text" 
                        value={firstName} 
                        placeholder="First Name" 
                        onChange={(e)=>setFirstName(e.target.value)} 
                    />
                </div>
                <div className="lastNameWrapper">
                    <label>Enter Last Name</label>
                    <input 
                        className='lastName' 
                        type="text" 
                        value={lastName} 
                        placeholder="LastName" 
                        onChange={(e)=>setLastName(e.target.value)} 
                    />
                </div>
                <div className="emailWrapper">
                    <label>Enter Email</label>
                    <input 
                        className='email' 
                        type="text" 
                        value={email} 
                        placeholder="Email" 
                        onChange={(e)=>setEmail(e.target.value)} 
                    />
                </div>
                <div className="passwordWrapper">
                    <label>Enter Password *</label>
                    <input 
                        className='password' 
                        type="password" 
                        value={password} 
                        placeholder="Password"
                        onChange={(e)=>setPassword(e.target.value)}    
                    />
                </div>
                <button disabled={isLoading} className='signupButton'>Sign Up</button>
                <p className='error'>{error}</p>
                <Link to={'/login'}><p className='linkToLogin'>Already have an account? Log In</p></Link>
            </form>
        </div>
    )
}

export default Signup;