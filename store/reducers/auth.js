import { AUTO_LOGIN, LOGIN, LOGOUT, SIGNUP } from "../actions/auth";
import {AsyncStorage} from 'react-native';

const initialState={
    token:null,
    userId:null
}


export default(state=initialState, action)=>{
    switch(action.type)
    {
        case LOGIN:
            return{
                ...state,
                token: action.token,
                userId:action.userId
            }
        case SIGNUP:
            return{
                ...state,
                token: action.token,
                userId:action.userId 
            }
        case AUTO_LOGIN:
            return{
                ...state,
                token:action.token,
                userId:action.userId
            }

        case LOGOUT:
            AsyncStorage.removeItem('userData');
            return{
                ...state,
                token:null,
                userId:null
            }
    }
    return state;
}