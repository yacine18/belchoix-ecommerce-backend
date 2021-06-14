import axios from 'axios';
import {ADD_CART_ITEM, REMOVE_CART_ITEM} from '../constants/cartConstants'

export const addToCart = (productId, qty) => async(dispatch, getState) => {
    const {data} = await axios.get(`/api/products/${productId}`);
    dispatch({
        type: ADD_CART_ITEM,
        payload: {
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            product: data._id
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = productId => (dispatch, getState) => {
    dispatch({
        type: REMOVE_CART_ITEM,
        payload: productId
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}