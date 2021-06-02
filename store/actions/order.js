export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS='SET_ORDERS';
import Order from '../../models/order'
export const fetchOrders=()=>{
    return async dispatch=>{
        let resArray = [];
        const response = await fetch('https://rn-shopping-app-r-default-rtdb.firebaseio.com/orders/u1.json');
        
        if(!response.ok)
        {
            throw new Error('Server error');
        }
        const resData = await response.json();

        for(const key in resData)
        {
            resArray.push(new Order(
                key,
                resData[key].itemsInCart,
                resData[key].totalAmount,
                new Date(resData[key].date)
            ))
        }
        dispatch({type:SET_ORDERS, orders:resArray});
    }
}
export const addOrder =(itemsInCart, totalAmount)=>
{
    return async dispatch =>{
        const date = new Date();
        const response = await fetch('https://rn-shopping-app-r-default-rtdb.firebaseio.com/orders/u1.json', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                itemsInCart,
                totalAmount,
                date: date.toISOString()
            })
        })
        if(!response.ok){
            throw new Error('Server error')
        }

        const resData = await response.json();
        dispatch({
            type:ADD_ORDER,
            orderData :{
                id : resData.name,
                date:date,
                cartItems : itemsInCart,
                amount :totalAmount}
        });
    }
    
}