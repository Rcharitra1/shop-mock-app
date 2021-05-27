import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
const ProductsOverviewScreen = props =>{
    const products = useSelector(state=> state.products.availableProducts);
    const dispatch = useDispatch();
 
    const renderItemData = itemData =>{
        return <ProductItem imageUrl = {itemData.item.imageUrl} title={itemData.item.title} price={itemData.item.price} onViewDetail={()=>{
            props.navigation.navigate({
               routeName:'ProductDetail',
               params:{
                   'productId':itemData.item.id,
                   'productTitle':itemData.item.title
               } 
            })
        }} onAddToCart={()=>{
            dispatch(cartActions.addToCart(itemData.item))
        }}/>
    }
    return(
        <FlatList data={products} keyExtractor={ (item)=> item.id} renderItem={renderItemData}
        />
    );
}

ProductsOverviewScreen.navigationOptions = navData=>{
    return{
        headerTitle:'All Products'
    }
}

export default ProductsOverviewScreen;