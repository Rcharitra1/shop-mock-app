
import React from 'react';
import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import { Platform } from 'react-native'
import Colors from '../constants/Colors';
import OrdersScreen from '../screens/shop/OrdersScreen';
import {createDrawerNavigator} from 'react-navigation-drawer';

import ProductsOverviewScreen from '../screens/shop/ProductOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import {Ionicons} from '@expo/vector-icons'

const defaultNavOptions = {
    headerStyle:{
        backgroundColor:Platform.OS==='android'?Colors.primary:''
    },
    headerTitleStyle:{
        fontFamily:'open-sans-bold'
    },
    headerTintColor:Platform.OS==='android'?'white':Colors.primary
}

const ProductNavigator = createStackNavigator({
    ProductsOverview:{
        screen:ProductsOverviewScreen,
    },
    ProductDetail:ProductDetailScreen,
    Cart: CartScreen
},{
    navigationOptions:{
        drawerIcon: drawerConfig=><Ionicons name={Platform.OS==='android'? 'md-cart': 'ios-cart'} size={23} color={drawerConfig.tintColor}/>
    },
    defaultNavigationOptions:defaultNavOptions
})

const OrdersNavigator = createStackNavigator({
    Orders:OrdersScreen
}, {navigationOptions:{
    drawerIcon : drawerConfig=><Ionicons name={Platform.OS==='android'? 'md-list':'ios-list'} size={23} color={drawerConfig.tintColor}/>
},
    defaultNavigationOptions:defaultNavOptions})

const ShopNavigator = createDrawerNavigator({
    Products : ProductNavigator,
    Orders : OrdersNavigator
},{
    contentOptions:{
        activeTintColor : Colors.primary
    }
})


export default createAppContainer(ShopNavigator);