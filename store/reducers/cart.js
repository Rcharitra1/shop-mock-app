import { ADD_TO_CART } from '../actions/cart';
import CartItem from '../../models/cart-item';
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
    }
    return state
}