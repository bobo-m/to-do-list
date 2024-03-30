import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import './Login.css'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading } = useLogin();

    const handleSubmit = (e) =>{
        e.preventDefault();
        login(email,password);
    }
    return (
        <div className="loginWrapper">
            <form className="login" onSubmit={(e)=>handleSubmit(e)}>
                <h1>Login</h1>
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
                    <label>Enter Password</label>
                    <input 
                        className='password' 
                        type="password" 
                        value={password} 
                        placeholder="Password"
                        onChange={(e)=>setPassword(e.target.value)}    
                    />
                </div>
                <button disabled={isLoading} className='loginButton'>Log In</button>
                <p className="error">{error}</p>
                <Link to={'/signup'}><p className='linkToSignup'>Don't have an account? Sign Up</p></Link>
            </form>
        </div>
    )
}

export default Login;