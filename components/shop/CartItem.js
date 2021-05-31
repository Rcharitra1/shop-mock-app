import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native'
import {Ionicons} from '@expo/vector-icons'

const CartItem = props =>{

    return (
        <View style={{...styles.cartItem, ...props.style}}>
        <View style={styles.itemData}>
        <Text style={styles.quantity}>QTY: {props.quantity}</Text><Text style={{...styles.mainText, marginLeft:10}}>{props.title}</Text>
        </View>
        <View style={styles.itemData}>
        <Text style={styles.mainText}>${props.price.toFixed(2)}</Text>
        {props.deletable &&
            <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
        <Ionicons name={Platform.OS==='android'? 'md-trash':'ios-trash'} size={23} color='red'/>
        </TouchableOpacity>
        }
        
        </View>
        </View>
    );
}

const styles= StyleSheet.create({
    cartItem:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        shadowColor:'black',
        shadowOpacity:0.5,
        shadowRadius:6,
        shadowOffset:{height:4, width:2},
        backgroundColor:'white',
        borderRadius:6,
        padding:10,
        elevation:10,
        marginBottom:10,
    },
    itemData:{
        flexDirection:'row',
        alignItems:'center'
    },
    quantity:{
        fontFamily:'open-sans',
        color:'#888',
        fontSize:16
    },
    mainText:{
        fontFamily:'open-sans-bold',
        fontSize:16
    },
   
    deleteButton:{
        marginLeft:10
    }
})

export default CartItem