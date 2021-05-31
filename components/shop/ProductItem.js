import React from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import Colors from '../../constants/Colors';
import CustomButton from '../ui/CustomButton';

const ProductItem = props =>{

    let TouchView = TouchableOpacity

    if(Platform.OS==='android' && Platform.Version>=21)
    {
        TouchView = TouchableNativeFeedback
    }
    return (
        <View style={{...styles.box, ...props.style}}>
        <TouchView activeOpacity={0.5} onPress={props.onSelect} useForeground disabled={props.touchable}>
        <View style={styles.touchable}>
      <View style={styles.imageContainer}>
      <Image style={{...styles.image}} source={{uri:props.imageUrl}}  />
      </View>
      
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.price}>${props.price}</Text>
      <View style={styles.buttonContainer}>
   
            <CustomButton onPress={props.onSelect} style={styles.button}>{props.firstButtonTitle}</CustomButton>
    
            <CustomButton onPress={props.onSecondButtonPress} style={{backgroundColor:Colors.accent, ...styles.button}}>{props.secondButtonTitle}</CustomButton>
        

       
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
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:10,
        height: '15%'
    },

    button:{
        width: 150
    },
    imageContainer:{
        width: '100%',
        height: '65%',
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

      // <Button color={Colors.primary} title='View Details' onPress={props.onViewDetail}/>