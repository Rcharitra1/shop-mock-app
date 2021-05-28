import React from 'react';
import { View, Text, StyleSheet, Image, Button, ScrollView, Platform} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {useSelector, useDispatch} from 'react-redux';
import CustomButton from '../../components/ui/CustomButton';
import Colors from '../../constants/Colors'
import * as cartActions from '../../store/actions/cart'
import HeaderButton from '../../components/ui/HeaderButton';

const ProductDetailScreen = props =>{

    const productId = props.navigation.getParam('productId');
    const selectedProduct =  useSelector(state => state.products.availableProducts.find(product=> product.id===productId));
    const dispatch = useDispatch();


    return(
        <ScrollView>
        <View style={styles.screen}>
        <Image source={{uri:selectedProduct.imageUrl}} style={styles.image}/>
        <View style={styles.buttonContainer}>
        <CustomButton onPress={()=>{
            dispatch(cartActions.addToCart(selectedProduct))
        }}>Add To Cart</CustomButton>
        </View>
        
        <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
        <Text style={styles.description}>{selectedProduct.description}</Text>
        
        </View>
        </ScrollView>
        
    );
}


ProductDetailScreen.navigationOptions = navData =>{
    const headerTitle = navData.navigation.getParam('productTitle');
    return{
        headerTitle:headerTitle,
        headerRight :()=> <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item name='cart' iconName={Platform.OS==='android'?'md-cart': 'ios-cart'} color='red' onPress={()=>{
            navData.navigation.navigate({routeName:'Cart'})
        }} />
        </HeaderButtons>
    }
    
}
const styles = StyleSheet.create({
    image:{
        height: 300,
        width: '100%'
    },
    screen:{
        flex:1,
        alignItems:'center'
    },
    description:{
        textAlign:'center',
        fontSize:16,
        marginHorizontal:20
    },
    price:{
        color: '#888',
        textAlign:'center',
        borderRadius:6,
        fontSize:20,
        borderColor:'green',
        borderWidth:1,
        margin:20,
        padding:10,
        fontFamily:'open-sans'
    },

    buttonContainer:{
        marginTop:15
    }
})

export default ProductDetailScreen;