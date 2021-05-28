import React from 'react';
import { TouchableOpacity, View, StyleSheet, Platform, TouchableNativeFeedback, Text } from 'react-native';
import Colors from '../../constants/Colors';

const CustomButton = props =>{

    let Touch = TouchableOpacity;

    if(Platform.OS==='android' && Platform.Version>=21)
    {
        Touch = TouchableNativeFeedback
    }
    return(
            <Touch onPress={props.onPress} style={{borderRadius:6}} activeOpacity={0.5}><View style={{...styles.buttonView, ...props.style}}>
            <Text style={styles.textView}>{props.children}</Text>
            </View></Touch>
    );
}



const styles = StyleSheet.create({
    buttonView:{
        backgroundColor:Colors.primary,
        paddingVertical:10,
        paddingHorizontal:5,
        shadowColor:'grey',
        shadowOffset:{height:5, width:0},
        elevation:10,
        shadowOpacity:0.5,
        shadowRadius:6,
        borderRadius:6
    },
    textView:{
        color:'white',
        fontFamily:'open-sans-bold',
        fontSize:18,
        textAlign:'center'
    }
})
export default CustomButton;