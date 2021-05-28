import React from 'react';
import { View, FlatList, StyleSheet, Text, Platform } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/ui/HeaderButton'
import {useSelector} from 'react-redux';
import OrderItem from '../../components/shop/OrderItem'

const OrdersScreen = (props)=>{

    const renderItemData = itemData =>{
        return <OrderItem orderId = {itemData.item.id} 
        totalAmount = {itemData.item.totalAmount}
        date = {itemData.item.FormattedDate}
        />
        
    }
    const {orders}= useSelector(state => state.orders)
    console.log(orders)

    return(
        <FlatList data={orders} keyExtractor={ (item)=> item.id} renderItem={renderItemData}
        />
    );
}

const styles = StyleSheet.create({

});

OrdersScreen.navigationOptions = navData=>{
    return{
        headerTitle:'Your Orders',
        headerLeft:()=><HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title='menu' iconName={Platform.OS==='android'?'md-menu':'ios-menu'} onPress={()=>{
            navData.navigation.toggleDrawer()
        }}/>
        </HeaderButtons>
    }
}

export default OrdersScreen;