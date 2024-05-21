import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useSignUp = () =>{
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async (email, password)=>{
        setIsLoading(true);
        setError(null);

        // send post request to add user and generate token
        try {
            const response = await axios.post('/api/user/signup', {email, password}, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const user = response.data;

            // save token to local storage
            localStorage.setItem('user', JSON.stringify(user));
    
            // dispatch login action
            dispatch({
                type: 'LOGIN',
                user: user
            });
    
            setIsLoading(false);
        } catch (error) {
            if(error.response){
                setIsLoading(false);
                setError(error.response.data.error);            
            }
        };
    }

    return {signup, error, isLoading };
}