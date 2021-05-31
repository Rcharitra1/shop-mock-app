import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import CustomButton from '../../components/ui/CustomButton'

import {useSelector, useDispatch} from 'react-redux'
import CartItem from '../../components/shop/CartItem'
import * as cartActions from '../../store/actions/cart';
import * as orderActions from '../../store/actions/order';

const CartScreen = props =>{

    const {items, totalAmount} = useSelector(state=> state.cart);

    const transformedCartItem = [];

    const dispatch = useDispatch();
    const onRemove = (id)=>{
        console.log(id)
        dispatch(cartActions.removeFromCart(id))
    }

    const onOrder = (itemsInCart, totalAmount)=>{
        dispatch(orderActions.addOrder(itemsInCart, totalAmount));
    }

    for(const key in items)
    {
        transformedCartItem.push({
            productId : key,
            productTitle : items[key].productTitle,
            productPrice : items[key].productPrice,
            quantity:items[key].quantity,
            sum: items[key].sum
            

        })
    }

    transformedCartItem.sort((a, b)=> a.productId>b.productId?1:-1)

    const renderCartItem = itemData =>{
        return(
            <CartItem title={itemData.item.productTitle} quantity={itemData.item.quantity} price={parseFloat(itemData.item.productPrice)* parseFloat(itemData.item.quantity)} onRemove={()=>onRemove(itemData.item.productId)} deletable={true}/>
        );
    }
    let shopScreen = <Text></Text>

    let renderScreen = <FlatList data={transformedCartItem} renderItem={renderCartItem} keyExtractor={item=> item.productId}/>
    if(transformedCartItem.length===0)
    {
        renderScreen = <Text style={{...styles.default, alignItems:'center', justifyContent:'center'}}>No Item in Shopping Cart</Text>

    }else
    {
        shopScreen = (
            <View>
    <View style={styles.summary}>
    <Text style={styles.default}>Total: <Text style={{color:'#888'}}>${totalAmount.toFixed(2)}</Text></Text>
    <View style={styles.buttonStyle}>
      <CustomButton onPress={()=>{onOrder(transformedCartItem, totalAmount)}}>Order Now</CustomButton>
    </View>
    </View>
    

    </View>
        )
    }

    


    return(
    <View style={styles.screen}>
    {shopScreen}

    <View>
    {renderScreen}
    </View>
    </View>
    );
};

const styles = StyleSheet.create({
    screen:{
        margin:10,
    },
    default:{
        textAlign:'center', 
        fontSize:18, 
    },

    summary:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        shadowColor:'black',
        shadowOpacity:0.5,
        shadowRadius:6,
        shadowOffset:{height:4, width:0},
        backgroundColor:'white',
        borderRadius:6,
        padding:10,
        elevation:10,
        marginBottom:10
    }

});

export default CartScreen;