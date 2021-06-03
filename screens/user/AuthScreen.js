import React, {useState, useEffect, useReducer, useCallback} from 'react';
import { ScrollView, StyleSheet, View,Text, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native'
import {useDispatch} from 'react-redux'
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card'
import CustomButton from '../../components/ui/CustomButton'
import Colors from '../../constants/Colors'
import {LinearGradient} from 'expo-linear-gradient'
import * as authActions from '../../store/actions/auth';

const FORM_UPDATE='FORM_UPDATE';
const formReducer = (state, action)=>{
    switch(action.type){
        case FORM_UPDATE:
            const updatedValues ={
                ...state.inputValues,
                [action.input]:action.value
            };

            const updatedValididities = {
                ...state.inputValidities,
                [action.input]:action.isValid
            };

            let formIsValid = true;
            for(const key in updatedValididities)
            {
                formIsValid = formIsValid && updatedValididities[key];
            }

            return{...state, 
                inputValues:updatedValues,
                inputValidities:updatedValididities,
                formIsValid:formIsValid
            };

    }
    return state;
};




const AuthScreen = props =>{

    const [isLoginScreen, setIsLoginScreen]=useState(true);
    const [isLoading, setisLoading] = useState(false)
    const [error, setError] = useState()
    const dispatch = useDispatch()


    const [formState, dispatchFormState]= useReducer(formReducer, 
        {inputValues:{
            email:'',
            password:''
        }, 
        inputValidities:{
            email:false,
            password:false
        }, 
        formIsValid:false})



    const onSubmitClick =  () => {
        if(!formState.formIsValid)
        {
            Alert.alert('Wrong Input', 'Invalid input, pls try again', [{text:'OK'}])
            return;

        }else
        {
           
            let action=''
        
            if(!isLoginScreen)
            {
                action=authActions.signUp(formState.inputValues.email, formState.inputValues.password)
              
            }else
            {
                action=authActions.login(formState.inputValues.email, formState.inputValues.password)
            }
            setisLoading(true)
            setError(null)
            
            dispatch(action).then(()=>{
                props.navigation.navigate({
                    routeName:'Shop'
                })
            }).catch((ee)=>{ 
                setError(ee) 
                setisLoading(false)
                console.log(ee)
            }) 
        }
        
       
    }


    // useEffect(() => {
   
    //     if(error)
    //     {
    //         let message = error
    //         console.log(error)
    //         Alert.alert('Error', message, [{text:'Okay'}])
    //         return;
    //     }
       
    // }, [error])


    const inputChangeHandler= useCallback( (inputIdentifier,inputValue, inputValidity)=>{

        dispatchFormState({
            type:FORM_UPDATE, 
            value: inputValue, 
            isValid:inputValidity,
            input:inputIdentifier
        });
    
        
       },[dispatchFormState])
    return(
        <KeyboardAvoidingView behavior={Platform.OS==='android'? '': 'padding' } keyboardVerticalOffset={50} style={styles.screen}>
        <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
        <Card style={styles.authContainer}>
        <ScrollView>
        <Text style={styles.titleText}>{isLoginScreen? 'Login': 'Register'}</Text>
        <Input id='email' label='Email' email required
         keyboardType='email-address'  isValid={formState.inputValidities.email} autoCapitalize="none" error='Pls enter a valid email' onInputChange={inputChangeHandler} initialValue='' />

        <Input id='password' label='Password' required secureTextEntry minLength={5}  isValid={formState.inputValidities.password}
        autoCapitalize="none" error='Pls enter a valid password' onInputChange={inputChangeHandler} initialValue=''/>
        { isLoading ? <ActivityIndicator color={Colors.primary} size='small'/>:
            <CustomButton style={styles.button} onPress={onSubmitClick}>{isLoginScreen? 'Login': 'Register'}</CustomButton>
        }
        
        <CustomButton onPress={()=>{setIsLoginScreen(!isLoginScreen)}} style={{...styles.button, backgroundColor:Colors.accent}}>Switch to {isLoginScreen ? 'Sign-up':'Login'}</CustomButton>

        </ScrollView>
        </Card>
        </LinearGradient>
        </KeyboardAvoidingView>
        
        
    );
    
}

AuthScreen.navigationOptions=navData=>{
    return{
        headerTitle:"Shop N' Sell"
    };
}
const styles = StyleSheet.create({
    screen:{
        flex: 1,
    },
    button:{
        marginVertical:10
    },
    authContainer:{
        width: '80%',
        maxWidth:400,
        maxHeight:400,
        padding:20
    },
    gradient:{
        height: '100%',
        width: '100%',
        justifyContent:'center',
        alignItems:'center'
    },
    titleText:{
        fontFamily:'open-sans-bold',
        fontSize:22
    }
})

export default AuthScreen;