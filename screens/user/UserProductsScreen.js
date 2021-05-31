import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { FlatList, View, Text, Platform, Alert, StyleSheet} from 'react-native';
import ProductItem from '../../components/shop/ProductItem'
import HeaderButton from '../../components/ui/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import * as productActions from '../../store/actions/products'
const UserProductScreen = props =>{

    const dispatch = useDispatch();
     
    const {userProducts} = useSelector(state => state.products);

    const deleteAlert = (id)=>{
        Alert.alert('Are you sure?', 'Do you want to delete this item?', [
            {text:'No', style:'default'},
            {text:'Yes', style:'destructive', onPress:()=>{
                dispatch(productActions.deleteProduct(id))
            }}
        ])
    }

    const renderItemData = itemData =>{
        return <ProductItem key={itemData.item.id} title={itemData.item.title} imageUrl={itemData.item.imageUrl} price={itemData.item.price} onSelect={()=>{
            props.navigation.navigate({
                routeName:'EditProduct',
                params:{
                    productId : itemData.item.id,
                    headerTitle:'Edit Product'
                }
            })
        }} onSecondButtonPress={deleteAlert.bind(this,itemData.item.id)} firstButtonTitle={'Edit'} secondButtonTitle={'Delete'}/>
    }

    let renderScreen = <View style={styles.noItem}><Text style={styles.noItemText}>No item created by user</Text></View>


    if(userProducts.length>0)
    {
        renderScreen = <FlatList data={userProducts} keyExtractor={item=> item.id}
        renderItem={renderItemData} />
    }



    return<View>{renderScreen}</View>
}

UserProductScreen.navigationOptions = navData =>{
    return{
        headerTitle : 'User Products',
        headerLeft: ()=> <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item iconName={Platform.OS==='android'? 'md-menu': 'ios-menu'} onPress={()=> navData.navigation.toggleDrawer()}/>
        </HeaderButtons>,
        headerRight: ()=><HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item iconName={Platform.OS==='android'? 'md-add': 'ios-add'} onPress={()=>{
            navData.navigation.navigate({
                routeName:'EditProduct',
                params:{
                    headerTitle : 'Add Product'
                }
            })
        }}/>
        </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    noItem:{
        marginVertical:10,
        alignItems:'center'
    },
    noItemText:{
        fontSize:18,
        fontFamily:'open-sans',
        justifyContent:'center',
    }
})


export default UserProductScreen