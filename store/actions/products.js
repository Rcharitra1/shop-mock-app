export const DELETE_PRODUCT='DELETE_PRODUCT'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

export const deleteProduct = (id)=>{
    return {
        type: DELETE_PRODUCT,
        productId : id
    }
}

export const createProduct = (title, description, price, imageUrl)=>{
    return{
        type:CREATE_PRODUCT,
        productData:{
            title,
            description,
            price,
            imageUrl
        }
    }
}
export const updateProduct=(id, title, description, imageUrl)=>{
    return{
        type:UPDATE_PRODUCT,
        productData:{
            id,
            title, 
            description, 
            imageUrl
        }
    }
}