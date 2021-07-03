import axios from 'axios'
import { CART_ADD_ITEM, REMOVE_CART_ITEM } from '../constants/cartConstants'


export const addToCart = (productId, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`http://localhost:5000/api/products/${productId}`)
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            name: data.name,
            image: data.image,
            price: data.price,
            countStock: data.countStock,
            product: data._id,
            seller: data.seller,
            qty,
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = productId => (dispatch, getState) => {
    dispatch({type: REMOVE_CART_ITEM, payload: productId})
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
