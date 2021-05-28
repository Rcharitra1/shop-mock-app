export const ADD_ORDER = 'ADD_ORDER';

export const addOrder =(itemsInCart, totalAmount)=>
{
    return{
        type:ADD_ORDER,
        orderData :{
            cartItems : itemsInCart,
            amount :totalAmount
        }
    }
}