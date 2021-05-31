import React, {useState} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CustomButton from '../ui/CustomButton';
import CartItem from '../shop/CartItem'

const OrderItem = props =>{
    const [showDetails, setShowDetails] =useState(false);
    return(<View style={styles.box}>
        <View style={styles.summary}>

        <Text style={styles.totalAmount}>${props.totalAmount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>            
        </View>
        <CustomButton style={{marginBottom:10}} onPress={()=>{setShowDetails(!showDetails)}}>{showDetails?'Hide Details':'Show Details'}</CustomButton>
        {showDetails && <View style={styles.showDetail}>
            {props.items.map((item, index)=> <CartItem style={{shadowColor:'white', elevation:0}} key={index} title={item.productTitle} price={item.productPrice} quantity={item.quantity}/>
            )}
            </View>}
        </View>);
}

const styles = StyleSheet.create({
    box:{
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
    },
    showDetail:{
        width: '100%',
    }

})

export default OrderItem;