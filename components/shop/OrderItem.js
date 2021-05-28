import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CustomButton from '../ui/CustomButton';
import CartItem from '../shop/CartItem'

const OrderItem = props =>{
    return(<View style={styles.box}>
        <View style={styles.summary}>

        <Text style={styles.totalAmount}>${props.totalAmount}</Text>
        <Text style={styles.date}>{props.date}</Text>            
        </View>
        <CustomButton onPress={()=>{}}>Show Details</CustomButton>
        </View>);
}

const styles = StyleSheet.create({
    box:{
        height: 100,
        shadowColor:'black',
        shadowOffset:{
            height:2,
            width: 0
        },
        shadowOpacity:0.5,
        shadowRadius:6,
        elevation:5,
        margin:10,
        borderRadius:6,
        backgroundColor:'white',
        padding:10,
        flex:1,
        alignItems:'center'
    },
    summary:{
        flexDirection:'row',
        alignItems:'center',
        width: '100%',
        justifyContent:'space-between',
        marginVertical:5

    },
    totalAmount:{
        fontFamily:'open-sans-bold',
        fontSize:16,
        
    },
    date:{
        fontFamily:'open-sans',
        fontSize:16,
        color:'#888'
    }

})

export default OrderItem;