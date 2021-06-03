import {AsyncStorage} from 'react-native'
export const SIGNUP='SIGNUP';
export const LOGIN='LOGIN';
export const AUTO_LOGIN='AUTO_LOGIN';
export const LOGOUT='LOGOUT';

let timer;
const clearLogoutTimer = ()=>{
    if(timer)
    {
        clearTimeout(timer);
    }

}

export const autoLogin = (userId, token, expirationTime)=>{
    return async dispatch=>{
        dispatch(setLogoutTimer(expirationTime))
        dispatch({type:AUTO_LOGIN,
            userId:userId,
            token:token})
    }
}



const setLogoutTimer = (expirationTime)=>{
    return dispatch=>{
        timer = setTimeout(()=>{
            dispatch(logout);
        }, expirationTime)
    }
    
}

export const logout = ()=>{
    clearLogoutTimer();
    return {type: LOGOUT}
}


export const signUp = (email, password)=>{
    return async dispatch=>{
        const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD--u5DNaMTwiKuotbEPw2nR6rpt-OF4Po', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                email:email,
                password:password,
                returnSecureToken: true
            })
        })

        if(!response.ok)
        {
            throw new Error('Server side error')
        }

        const resData = await response.json();
        dispatch(setLogoutTimer(parseInt(resData.expiresIn)*1000))

        dispatch({type: SIGNUP, token: resData.idToken, userId:resData.localId});
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn)*1000)
        saveDataToStorage(resData.idToken, resData.localId, expirationDate);
       
    }
};


export const login = (email, password)=>{
    return async dispatch =>{
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD--u5DNaMTwiKuotbEPw2nR6rpt-OF4Po', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                email:email,
                password:password,
                returnSecureToken:true
            })
        })
        if(!response.ok)
        {
            const errorResData = await response.json();
            const errorId=errorResData.error.message;
            let message='Something went wrong';
            if(errorId==='EMAIL_NOT_FOUND'){
                message = 'This email doesnt exist'
                
            }else if(errorId==='INVALID_PASSWORD')
            {
                message='this password is not valid'
            }

            throw new Error(message)
        }
        const resData = await response.json();
        dispatch(setLogoutTimer(parseInt(resData.expiresIn)*1000))
        dispatch({type:LOGIN, token: resData.idToken, userId:resData.localId })
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn)*1000)
        saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    }
}

const saveDataToStorage = (token, userId, expirationDate)=>{
    AsyncStorage.setItem('userData', JSON.stringify({
        token : token,
        userId:userId,
        expiryDate: expirationDate.toISOString()
    }))
}