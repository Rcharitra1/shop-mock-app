import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux'
import { View, ActivityIndicator, AsyncStorage, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';


const StartupScreen = props =>{

    const dispatch = useDispatch()
    useEffect(() => {
        const tryLogin = async ()=>{
            const userData= await AsyncStorage.getItem('userData');

            if(!userData)
            {
                props.navigation.navigate({
                    routeName:'Auth'
                })
                return;
            }
            const transformedData = JSON.parse(userData)
            const {token, userId, expiryDate}= transformedData;
            const expirationDate  = new Date(expiryDate);
            if(expirationDate <= new Date() || !token || !userId)
            {
                props.navigation.navigate({
                    routeName:'Auth'
                })
                return;
            }

            const expirationTime = expirationDate.getTime() - new Date().getTime();
            console.log(expirationTime/(1000*60))

            props.navigation.navigate('Shop');
            dispatch(authActions.autoLogin(userId, token, expirationTime))
            
        }
        tryLogin();
    }, [])

    return (<View style={styles.screen}>
        <ActivityIndicator size='large' color= {Colors.primary}/>
    </View>);
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})

export default StartupScreen;