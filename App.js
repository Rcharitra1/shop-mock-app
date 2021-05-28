import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux';
import productReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart'
import orderReducer from './store/reducers/order';
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading';
import {composeWithDevTools} from 'redux-devtools-extension';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();

import ShopNavigator from './navigation/ShopNavigation'
const rootReducer = combineReducers({
  products : productReducer,
  cart:cartReducer,
  orders: orderReducer
})

const store = createStore(rootReducer, composeWithDevTools());
const fetchFonts = ()=>{
  return Font.loadAsync({
    'open-sans':require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold':require('./assets/fonts/OpenSans-Bold.ttf')
  })
}
export default function App() {
const [fontLoaded, setFontLoaded] = useState(false);

if(!fontLoaded)
{
  return <AppLoading startAsync={fetchFonts} onFinish={()=>{setFontLoaded(true)}}  onError={()=>console.log('error loading')} />
}
  

  return (
    <Provider store={store}>
    <ShopNavigator/>
    </Provider>
    
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
