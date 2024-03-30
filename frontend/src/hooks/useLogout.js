import { useAuthContext } from "./useAuthContext";
import { StateValue } from "../context/StateProvider";

export const useLogout = () =>{
    const { dispatch } = useAuthContext();
    // eslint-disable-next-line
    const [state, dispatchTasks] = StateValue();

    const logout = () =>{
        // remove user from local storage
        localStorage.removeItem('user');

        // dispatch logout action
        dispatch({
            type: 'LOGOUT'
        });

        dispatchTasks({
            type: "SET_DATA",
            tasks: [],
            lists: []
        })
    }

    return { logout };
}