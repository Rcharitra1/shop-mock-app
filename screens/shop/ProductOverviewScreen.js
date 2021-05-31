import React from 'react';
import { View, StyleSheet, FlatList, Text, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/ui/HeaderButton'
import {useSelector, useDispatch} from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
const ProductsOverviewScreen = props =>{
    const products = useSelector(state=> state.products.availableProducts);
    const dispatch = useDispatch();
 
    const renderItemData = itemData =>{
        return <ProductItem imageUrl = {itemData.item.imageUrl} title={itemData.item.title} price={itemData.item.price} onSelect={()=>{
            props.navigation.navigate({
               routeName:'ProductDetail',
               params:{
                   'productId':itemData.item.id,
                   'productTitle':itemData.item.title
               } 
            })
        }} onSecondButtonPress={()=>{
            dispatch(cartActions.addToCart(itemData.item))
        }}

        firstButtonTitle={'View Details'}
        secondButtonTitle={'Add To Cart'}
        />
    }
    return(
        <FlatList data={products} keyExtractor={ (item)=> item.id} renderItem={renderItemData}
        />
    );
}

ProductsOverviewScreen.navigationOptions = navData=>{
    return{
        headerTitle:'All Products',
        headerRight:()=><HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title='cart' iconName={Platform.OS==='android'? 'md-cart': 'ios-cart'} onPress={()=>{
            navData.navigation.navigate({routeName: 'Cart'})
        }}/>
        </HeaderButtons>,
        headerLeft:()=><HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title='menu' iconName={Platform.OS==='android'?'md-menu':'ios-menu'} onPress={()=>{
            navData.navigation.toggleDrawer();
        }}/>
        </HeaderButtons>
    }
}

export default ProductsOverviewScreen;