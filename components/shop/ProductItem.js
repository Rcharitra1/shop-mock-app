import React from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import Colors from '../../constants/Colors';

const ProductItem = props =>{

    let TouchView = TouchableOpacity

    if(Platform.OS==='android' && Platform.Version>=21)
    {
        TouchView = TouchableNativeFeedback
    }
    return (
        <View style={styles.box}>
        <TouchView activeOpacity={0.5} onPress={props.onViewDetail} useForeground>
        <View style={styles.touchable}>
      <View style={styles.imageContainer}>
      <Image style={{...styles.image}} source={{uri:props.imageUrl}}  />
      </View>
      
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.price}>{props.price}</Text>
      <View style={styles.buttonContainer}>
        <Button color={Colors.primary} title='View Details' onPress={props.onViewDetail}/>
        <Button color={Colors.accent} title='To Cart' onPress={props.onAddToCart}/>
      </View>
      </View> 
        </TouchView>
        </View>
       
       
    );
}

const styles = StyleSheet.create({
    box:{
        height: 300,
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
        paddingBottom:10,
    },
    touchable:{
        overflow: 'hidden',
        borderRadius:6
    },
    buttonContainer:{
        flexDirection:'row',
        width: '100%',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:10
    },
    imageContainer:{
        width: '100%',
        height: '70%',
        borderTopLeftRadius:6,
        borderTopRightRadius:6,
        overflow: 'hidden'
        
    },
    image:{
        height: '100%',
        width: '100%'
    },
    title:{
        fontSize:18,
        marginVertical:4,
        textAlign:'center',
        fontFamily:'open-sans-bold'
    },
    price:{
        fontSize:16,
        color: '#888',
        textAlign:'center',
        fontFamily:'open-sans'
    }
})

export default ProductItem