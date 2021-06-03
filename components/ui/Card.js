import React from 'react';
import { View, StyleSheet } from 'react-native'

const Card = props =>{
    return <View style={{...styles.card, ...props.style}}>{props.children}</View>
}

const styles = StyleSheet.create({
    card:{
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
    }
})

export default Card;