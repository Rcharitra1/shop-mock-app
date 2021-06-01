import React,{useReducer, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native'

const INPUT_CHANGE ='INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';
const inputReducer = (state, action)=>{
    switch(action.type)
    {
        case INPUT_CHANGE:
            return{
                ...state,
                value:action.value,
                isValid:action.isValid
            }
        case INPUT_BLUR:
            return{
                ...state,
                touched:true
            }
        default:
            return state    
    }
}
const Input = props =>{

    const [inputState, dispatch]=useReducer(inputReducer, {
        value:props.initialValue ? props.initialValue :'',
        isValid : props.initiallyValied ? true : false,
        touched: false
    })
    const textChangeHandler = text=>{
        const emailRegex=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        let isValid = true;
        if(props.required && text.trim().length===0)
        {
            isValid = false;
        }
        if(props.email && !emailRegex.test(text.toLowerCase()))
        {
            isValid = false
        }
        if(props.min !=null && +text<props.min)
        {
            isValid=false
        }
        if(props.max !=null && +text>props.max)
        {
            isValid = false
        }
        if(props.minLength !=null && text.length<props.minLength)
        {
            isValid = false
        }
        dispatch({type:INPUT_CHANGE, value:text, isValid:isValid})
    }
    const lostFocusHandler = ()=>{
        dispatch({type:INPUT_BLUR})
    }

    const {id, onInputChange}=props

    useEffect(()=>{
        if(inputState.touched)
        {
            onInputChange(id, inputState.value, inputState.isValid)
        }
        
    }, [inputState, onInputChange, id])
    return(
        <View style={styles.formControl}>
        <Text style={styles.label}>{props.label}</Text>
        <TextInput style={styles.input} 
        {...props}
        value={inputState.value} onChangeText={textChangeHandler}
        onBlur={lostFocusHandler}
        />
        {!props.isValid && inputState.touched && <View style={styles.errorContainer}><Text style={styles.error}>{props.error}</Text></View>}
    </View>
   
        
    );
}

const styles = StyleSheet.create({
    formControl:{
        width: '100%'
    },
    label:{
        fontFamily:'open-sans-bold',
        marginVertical:8
    },
    
    input:{
        paddingHorizontal:10,
        paddingVertical:10,
        borderRadius:6,
        fontSize:18,
        shadowColor:'black',
        shadowOffset:{
            height: 3,
            width: 0
        },
        shadowOpacity:0.5,
        shadowRadius:6,
        elevation:6,
        borderColor:'#ccc',
        borderWidth:1,
        backgroundColor:'white'
    },
    error:{
        color:'red',
        fontFamily:'open-sans'
    },
    errorContainer:{
        marginVertical:5
    }
});

export default Input;