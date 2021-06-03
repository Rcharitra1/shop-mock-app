export const DELETE_PRODUCT='DELETE_PRODUCT'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const SET_PRODUCTS='SET_PRODUCTS'
import Product from '../../models/product';

export const fetchProducts = ()=>{
    return async (dispatch, getState)=>{
        //any async code you want
        const {userId} = getState().auth
        try{
            const response =await fetch('https://rn-shopping-app-r-default-rtdb.firebaseio.com/products.json');
            if(!response.ok){
                throw new Error('something went wrong')
            }

            const resData = await response.json();
            const loadedProducts = [];
            for(const key in resData)
            {
                loadedProducts.push(new Product
                    (
                        key,
                        resData[key].ownerId,
                        resData[key].title,
                        resData[key].imageUrl,
                        resData[key].description,
                        resData[key].price
                    ))
            }
            dispatch({type:SET_PRODUCTS, products:loadedProducts, userProducts: loadedProducts.filter(prod=> prod.ownerId===userId)}) 
        }catch(e)
        {
            throw e
        }
        
    }
}

export const deleteProduct = (id)=>{
    return async (dispatch, getState) =>{

        const token = getState().auth.token;
        const resData = await fetch(`https://rn-shopping-app-r-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`, {
            method:'DELETE',
           
        })

        if(!resData.ok)
        {
            throw new Error('delete failed')
        }
        dispatch({
            type: DELETE_PRODUCT,
            productId : id
        })
        
    }
}

export const createProduct = (title, description, price, imageUrl)=>{
    return async (dispatch, getState)=>{
        //any async code you want
        const {userId,token}= getState().auth;
        const response =await fetch(`https://rn-shopping-app-r-default-rtdb.firebaseio.com/products.json?auth=${token}`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                title, 
                description, 
                imageUrl, 
                price, 
            ownerId:userId})
        })

        const resData = await response.json();
        dispatch({
            type:CREATE_PRODUCT,
            productData:{
                id:resData.name,
                title,
                description,
                price,
                imageUrl,
                ownerId:userId
            }
        })
    }
    
}
export const updateProduct=(id, title, description, imageUrl)=>{
    // console.log(title, description, imageUrl)
    return async (dispatch, getState)=>{

    const token= getState().auth.token;

const resData=await fetch(`https://rn-shopping-app-r-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`, {
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                title, 
                description, 
                imageUrl})
        })

        if(!resData.ok)
        {
            throw new Error('something went wrong')
        }

        const getData = await resData.json()
        console.log(getData)

    

        dispatch({
            type:UPDATE_PRODUCT,
            productData:{
                id,
                title, 
                description, 
                imageUrl
            }
        })
    }
}