import React, {useEffect, useState} from 'react';
import { View, FlatList, StyleSheet, Text, Platform, ActivityIndicator } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/ui/HeaderButton'
import {useSelector, useDispatch} from 'react-redux';
import OrderItem from '../../components/shop/OrderItem'
import * as orderActions from '../../store/actions/order';
import Colors  from '../../constants/Colors';

const OrdersScreen = (props)=>{

    const [isLoading, setIsLoading]=useState(false);

    const renderItemData = itemData =>{
        return <OrderItem orderId = {itemData.item.id} 
        totalAmount = {itemData.item.totalAmount}
        date = {itemData.item.FormattedDate}
        items = {itemData.item.items}
        />
        
    }

    const dispatch = useDispatch();


    
  

    const {orders}= useSelector(state => state.orders)
    useEffect(() => {
        setIsLoading(false)
        dispatch(orderActions.fetchOrders())
        .then(()=>{
            setIsLoading(false)
        })
    }, [dispatch])

  
    if(isLoading)
    {
        return <View><ActivityIndicator size='large' color={Colors.primary}/></View>
    }

    if(!isLoading && orders.length===0)
    {
        return <View style={styles.centered}><Text style={styles.noText}>No orders had been placed</Text></View>
    }

    

    return(
        <FlatList data={orders} keyExtractor={ (item)=> item.id} renderItem={renderItemData}
        />
    );
}

const styles = StyleSheet.create({
    centered:{
        flex: 1,
        alignItems:'center',
        marginVertical:10
    },
    noText:{
        fontFamily:'open-sans',
        fontSize:18,

        
    }
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