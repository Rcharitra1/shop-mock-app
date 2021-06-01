import React, { useState, useEffect, useCallback, useReducer} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { View,  StyleSheet, ScrollView, Platform, Alert , KeyboardAvoidingView, ActivityIndicator, } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/ui/HeaderButton'
import * as productActions from '../../store/actions/products'
import Input from '../../components/ui/Input';
import  Colors from '../../constants/Colors';
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

const EditProductScreen = (props)=>{

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError]=useState();


    const productId = props.navigation.getParam('productId');
    const product = useSelector(state=> state.products.userProducts.find(p=> p.id===productId));
    const dispatch = useDispatch();

    const [formState, dispatchFormState]= useReducer(formReducer, 
        {inputValues:{
            title:product? product.title:'',
            imageUrl:product? product.imageUrl:'',
            description:product? product.description:'',
            price:''
        }, 
        inputValidities:{
            title: product? true: false,
            imageUrl:product? true: false,
            description: product? true:false,
            price:product?true:false
        }, 
        formIsValid:product? true:false})



    useEffect(() => {
        if(error)
        {
            Alert.alert('An error occured!', error, [
                {text:'OK'}
            ])
        }
    }, [error])



   const submitHandler = useCallback(async ()=>{
       if(!formState.formIsValid){
           Alert.alert('Wrong Input', 'Pls enter valid input(s)', [{text:'Ok'}])
           return;
       }
       setIsLoading(true)
       setError(null)
       try{
        if(productId)
        {
          
            await dispatch(productActions.updateProduct(productId, formState.inputValues.title, formState.inputValues.description, formState.inputValues.imageUrl))
           
           
        }else
        {
            
            await dispatch(productActions.createProduct(formState.inputValues.title, formState.inputValues.description, +formState.inputValues.price, formState.inputValues.imageUrl))
         
        }
        props.navigation.goBack()
       }catch(e)
       {
           setError(e.message)
       }
       
       setIsLoading(false)
   
   },[dispatch, productId, formState])

   useEffect(()=>{
       props.navigation.setParams({submit: submitHandler})
   },[submitHandler])

   
   const inputChangeHandler= useCallback( (inputIdentifier,inputValue, inputValidity)=>{

    dispatchFormState({
        type:FORM_UPDATE, 
        value: inputValue, 
        isValid:inputValidity,
        input:inputIdentifier
    });

    
   },[dispatchFormState])
      
   if(isLoading)
   {
       return(
           <View style={styles.centered}>
           <ActivityIndicator size= 'large' color={Colors.primary}/>
           </View>
       );
   }
    
    return(
        <KeyboardAvoidingView style={{flex:1}} behavior='padding' keyboardVerticalOffset={2}>
        <ScrollView>
        <View style={styles.form}>
        <Input 
            autoCapitalize='sentences'
            autoCorrect
            returnKeyType='next'
            label={'Title'}
            error='Pls enter a valid title'
            isValid={formState.inputValidities.title}
            onInputChange={inputChangeHandler}
            initialValue ={product? product.title:''}
            initialValidity={!!product}
            required
            id='title'


        />
        {!product &&
            <Input 
            value={formState.inputValues.price}
            label='Price'
            error='Pls enter a valid price for the item'
            isValid={formState.inputValidities.price}
            keyboardType='decimal-pad'
            initialValue ={''}
            initialValidity={false}
            onInputChange={inputChangeHandler}
            required
            min={0.1}
            id='price'
            />
        }
        
        <Input 
        label='Image Url'
        error='Pls provide a valid image url'
        isValid = {formState.inputValidities.imageUrl}
        value={formState.inputValues.imageUrl}
        autoCapitalize='sentences'
            autoCorrect
            required

            initialValue ={product? product.imageUrl:''}
            initialValidity={!!product}
            onInputChange={inputChangeHandler}
            id='imageUrl'
        />
        <Input
        label='Description'
        error='pls provide a description'
        isValid={formState.inputValidities.description}
        value={formState.inputValues.description}
        autoCapitalize='sentences'
            autoCorrect
            multiline
            required
            numberOfLines={3}
            initialValue ={product? product.description:''}
            initialValidity={!!product}
            onInputChange={inputChangeHandler}
            id='description'
            minLength={5}
        />
        </View> 
        </ScrollView>
        </KeyboardAvoidingView>
        
    );
}

const styles = StyleSheet.create({
    form:{
        margin:20
    },

    centered:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
    error:{
        fontSize:18,
        fontFamily:'open-sans'
    }


});


EditProductScreen.navigationOptions= navData=>{
    const headerTitle = navData.navigation.getParam('headerTitle')

    const submitFn = navData.navigation.getParam('submit')
    return{
        headerTitle,
        headerRight:()=><HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item iconName={Platform.OS==='android'? 'md-checkmark':'ios-checkmark'} onPress={submitFn}/>
        </HeaderButtons>
    }
}

export default EditProductScreen;


