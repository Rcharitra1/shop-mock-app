import {PRODUCTS} from '../../data/dummy-data';
import Product from '../../models/product';
import { CREATE_PRODUCT, DELETE_PRODUCT, SET_PRODUCTS, UPDATE_PRODUCT } from '../actions/products';


const initialState = {
    availableProducts : PRODUCTS,
    userProducts : PRODUCTS.filter(m=> m.ownerId==='u1')
}

export default (state=initialState, action)=>{
    switch(action.type){
        case SET_PRODUCTS:
            return{
                ...state,
                availableProducts:action.products,
                userProducts:action.products.filter(prod=> prod.ownerId==='u1')
            }
        case DELETE_PRODUCT:
            return{
                ...state,
                userProducts: state.userProducts.filter(product=> product.id!==action.productId),
                availableProducts: state.availableProducts.filter(product=>product.id!==action.productId)
            };
        case CREATE_PRODUCT:
            const newProduct = new Product(
                action.productData.id,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                action.productData.price
            )
            return{
                ...state,
                availableProducts:state.availableProducts.concat(newProduct),
                userProducts:state.userProducts.concat(newProduct)
            }
        case UPDATE_PRODUCT:
            const productIndex = state.userProducts.findIndex(product => product.id===action.productData.id);
            const updatedProduct = new Product(
                action.id,
                'u1',
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                state.userProducts[productIndex].price
            )
            const updatedUserProduct = [...state.userProducts];
            updatedUserProduct[productIndex]=updatedProduct;
            const availableProductIndex = state.availableProducts.findIndex(prod=> prod.id===action.id);
            const updatedAvailableProduct = [...state.availableProducts];
            updatedAvailableProduct[availableProductIndex]=updatedProduct
            return {
                ...state,
                availableProducts: updatedAvailableProduct,
                userProducts:
                updatedUserProduct
            }
    }
    return state;
}