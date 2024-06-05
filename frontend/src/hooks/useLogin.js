import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useLogin = ()=>{
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (email, password) =>{
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post('https://task-manager-xsxw.onrender.com/api/user/login', { email, password }, {
                headers:{
                    "Content-Type": "application/json"
                }
            });

            const user = response.data;
            
            localStorage.setItem('user', JSON.stringify(user));

            dispatch({
                type:'LOGIN',
                user: user
            });

            setIsLoading(false);
        } catch (error) {
            if(error.response){
                setError(error.response.data.error);
                setIsLoading(false);
            }
        };
    }
    return { login, error, isLoading};
}