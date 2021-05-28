import { ADD_TO_CART, REMOVE_ALL, REMOVE_FROM_CART } from '../actions/cart';
import CartItem from '../../models/cart-item';
import { ADD_ORDER } from '../actions/order';
const initialState ={
    items:{},
    totalAmount:0
};

export default (state=initialState, action)=>{
    switch(action.type){
        case ADD_TO_CART:
            const addedProduct = action.product;
            const {price, title} = {...addedProduct};
            if(state.items[addedProduct.id])
            {
                const updatedCartItem = new CartItem(
                    state.items[addedProduct.id].quantity+1,
                    price,
                    title,
                    state.items[addedProduct.id].sum+price
                )
                return {
                    ...state,
                    items :{...state.items, [addedProduct.id]:updatedCartItem},
                    totalAmount: state.totalAmount + price
                }
            }else
            {
                const newCartItem = new CartItem(1, price, title, price);
                return {
                    ...state,
                    items:{...state.items, [addedProduct.id]:newCartItem},
                    totalAmount: state.totalAmount + price
                }
            }
        case REMOVE_FROM_CART:
            const selectedItem = state.items[action.pid];
            const currentQty = selectedItem.quantity


            let updatedCartItems;

            if(currentQty>1)
            {
                const updateCartItem = new CartItem(currentQty-1, selectedItem.productPrice, selectedItem.productTitle, selectedItem.sum-selectedItem.productPrice)
                updatedCartItems = {...state.items, [action.pid]:updateCartItem}
            }else
            {
                updatedCartItems = {...state.items};

                delete updatedCartItems[action.pid]
            }
            return {
                ...state,
                items : updatedCartItems,
                totalAmount: state.totalAmount-selectedItem.productPrice
            }
        case ADD_ORDER:
            return initialState
    }
    return state
}