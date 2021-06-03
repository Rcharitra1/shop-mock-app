import React from 'react';
import {useDispatch} from 'react-redux'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import { Platform, SafeAreaView, View } from 'react-native'
import Colors from '../constants/Colors';
import OrdersScreen from '../screens/shop/OrdersScreen';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';

import ProductsOverviewScreen from '../screens/shop/ProductOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import UserProductScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import {Ionicons} from '@expo/vector-icons'
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartUpScreen';
import CustomButton from '../components/ui/CustomButton';
import * as authActions from '../store/actions/auth';


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


const AdminNavigator = createStackNavigator({
    UserProducts: UserProductScreen,
    EditProduct:EditProductScreen
}, {navigationOptions:{
    drawerIcon : drawerConfig=><Ionicons name={Platform.OS==='android'? 'md-create':'ios-create'} size={23} color={drawerConfig.tintColor}/>
},
    defaultNavigationOptions:defaultNavOptions})

const ShopNavigator = createDrawerNavigator({
    Products : ProductNavigator,
    Orders : OrdersNavigator,
    Admin: AdminNavigator
},{
    contentOptions:{
        activeTintColor : Colors.primary
    },
    contentComponent: props =>{
        const dispatch = useDispatch();
        return (<View style={{flex:1}}>
        <SafeAreaView forceInset={{top:'always', horizontal:'never'}}>
        <DrawerItems {...props}/>
        <View style={{marginHorizontal:15}}>
        <CustomButton style={{width:100}} onPress={()=>{
            dispatch(authActions.logout())
            // props.navigation.navigate({
            //     routeName:'Auth'
            // })
        }}>Logout</CustomButton>
        </View> 
       
        </SafeAreaView>
        </View>)
    }
})

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
}, {
    defaultNavigationOptions: defaultNavOptions
})

const MainNavigator = createSwitchNavigator({
    Startup:StartupScreen,
    AuthScreen:AuthNavigator,
    Shop:ShopNavigator
})


export default createAppContainer(MainNavigator);