import React, {useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { View, Text, StyleSheet, TextInput, ScrollView, Platform, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/ui/HeaderButton'
import * as productActions from '../../store/actions/products'


const EditProductScreen = (props)=>{

    const productId = props.navigation.getParam('productId');
    const product = useSelector(state=> state.products.userProducts.find(p=> p.id===productId));
    const dispatch = useDispatch();

    const [title, setTitle]= useState(product? product.title:'');
    const [titleIsValid, setTitleIsValid]=useState(product?true:false)
    const [price, setPrice] = useState('')
    const [description, setDescription]=useState(product?product.description : '')
    const [imageUrl, setImageUrl]=useState(product?product.imageUrl:'')


   const submitHandler = useCallback(()=>{
       if(!titleIsValid){
           Alert.alert('Wrong Input', 'Pls enter valid input(s)', [{text:'Ok'}])
           return;
       }
       if(product)
       {
           dispatch(productActions.updateProduct(productId, title, description, imageUrl))
          
       }else
       {
           dispatch(productActions.createProduct(title, description, +price, imageUrl))
        
       }
       props.navigation.goBack()
   },[dispatch, productId, title, description, imageUrl, price])

   useEffect(()=>{
       props.navigation.setParams({submit: submitHandler})
   },[submitHandler])

   const titleChangeHandler = text=>{
    if(text.trim().length===0){
        setTitleIsValid(false)
    }else
    {
        setTitleIsValid(true)
    }
    setTitle(text)
   }
      
    
    return(
        <ScrollView>
        <View style={styles.form}>
        <View style={styles.formControl}>
            <Text style={styles.label}>Title</Text>
            <TextInput style={styles.input} 
            keyboardType='default'
            value={title} onChangeText={titleChangeHandler.bind(this)}
            autoCapitalize='sentences'
            autoCorrect
            returnKeyType='next'
            />
        </View>
        {!titleIsValid && <Text>Please enter a valid title</Text>}

        {!product &&
            <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            
            <TextInput style={styles.input}
            keyboardType='decimal-pad'
             value={price} onChangeText={text=> setPrice(text)}/>
        </View>
        }
        
        <View style={styles.formControl}>
            <Text style={styles.label}>Description</Text>
            <TextInput style={styles.input} value={description} onChangeText={text=> setDescription(text)}/>
        </View>
        <View style={styles.formControl}>
            <Text style={styles.label}>ImageUrl</Text>
            <TextInput style={styles.input} onChangeText={text=> setImageUrl(text)} value={imageUrl}/>
        </View>
        </View> 
        </ScrollView>
        
    );
}

const styles = StyleSheet.create({
    form:{
        margin:20
    },
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