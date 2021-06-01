import React, {useState,useEffect, useCallback} from 'react';
import { Text, StyleSheet, View, FlatList,  Platform , ActivityIndicator} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/ui/HeaderButton'
import {useSelector, useDispatch} from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import * as productActions from '../../store/actions/products';
import CustomButton from '../../components/ui/CustomButton'
import Colors from '../../constants/Colors'


const ProductsOverviewScreen = props =>{
    const products = useSelector(state=> state.products.availableProducts);
    const dispatch = useDispatch();


    const [isLoading, setIsLoading]=useState(false)
    const [error, setError] = useState();
    const loadProducts = useCallback( async ()=>{
        setError(null)
        setIsLoading(true)
        try{
            await dispatch(productActions.fetchProducts());
        }catch(err)
        {
            setError(err.message)
        }
        
        setIsLoading(false)
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
       
        loadProducts();
    },[dispatch, loadProducts]);
    
    useEffect(() => {
        const willFocus = props.navigation.addListener('willFocus', ()=>{
            loadProducts()
        })
        return()=>{
           willFocus.remove()
        }
    }, [loadProducts])

    if(error)
    {
        return(
            <View style={styles.centered}>
            <Text style={styles.noProducts}>Something Broke</Text>
            <CustomButton onPress={loadProducts}>Try Again</CustomButton>
            </View>
        );
    }

    if(isLoading)
    {
        return (<View style={styles.centered}>
            <ActivityIndicator size='large' color={Colors.primary}/>
        </View>);
    }

    if(!isLoading && products.length===0)
    {
        return(
            <View style={styles.centered}>
            <Text style={styles.noProducts}>No products available</Text>
            </View>
        );
    }
 
    const renderItemData = itemData =>{
        return <ProductItem imageUrl = {itemData.item.imageUrl} title={itemData.item.title} price={itemData.item.price} onSelect={()=>{
            props.navigation.navigate({
               routeName:'ProductDetail',
               params:{
                   'productId':itemData.item.id,
                   'productTitle':itemData.item.title
               } 
            })
        }} onSecondButtonPress={()=>{
            dispatch(cartActions.addToCart(itemData.item))
        }}

        firstButtonTitle={'View Details'}
        secondButtonTitle={'Add To Cart'}
        />
    }
    return(
        <FlatList data={products} keyExtractor={ (item)=> item.id} renderItem={renderItemData}
        />
    );
}

ProductsOverviewScreen.navigationOptions = navData=>{
    return{
        headerTitle:'All Products',
        headerRight:()=><HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title='cart' iconName={Platform.OS==='android'? 'md-cart': 'ios-cart'} onPress={()=>{
            navData.navigation.navigate({routeName: 'Cart'})
        }}/>
        </HeaderButtons>,
        headerLeft:()=><HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title='menu' iconName={Platform.OS==='android'?'md-menu':'ios-menu'} onPress={()=>{
            navData.navigation.toggleDrawer();
        }}/>
        </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    centered:{
        flex:1, 
        justifyContent:'center', 
        alignItems:'center'
    },
    noProducts:{
        fontFamily:'open-sans',
        fontSize:18
    }
})

export default ProductsOverviewScreen;