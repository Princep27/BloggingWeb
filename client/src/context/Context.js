import {  useEffect, useReducer } from "react";
import { createContext } from "react";
import Reducer from "./Reducer";

const INITIAL_STATE = {
    user : JSON.parse(localStorage.getItem("User")) || null,
    isFetching :false,
    error :false
};

//user is and object storing user info

export const Context = createContext();
export  const ContextProvider = ({children})=>{ 
    const [state,dispatch] = useReducer(Reducer,INITIAL_STATE);

    useEffect(()=>{
        localStorage.setItem("User",JSON.stringify(state.user));
    },[state.user]);

    return (<Context.Provider value = {{
        user : state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch :dispatch
        }}
    >
      {children}
    </Context.Provider>);
}     