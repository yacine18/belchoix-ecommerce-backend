import axios from 'axios';
import {
    USER_SIGNUP_FAIL,
    USER_SIGNUP_SUCCESS,
    USER_SIGNUP_REQUEST,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNOUT
} from '../constants/userConstants';


export const register = (name, email, password, mobile) => async (dispatch) => {
    dispatch({
        type: USER_SIGNUP_REQUEST,
        payload: { email, password, name, mobile }
    })

    try {
        const { data } = await axios.post('/api/users/register', { name, email, password, mobile })
        dispatch({
            type: USER_SIGNUP_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload: message
        })
    }
}

export const signin = (email, password) => async (dispatch) => {
    dispatch({
        type: USER_SIGNIN_REQUEST,
        payload: { email, password }
    })

    try {

        const { data } = await axios.post('/api/users/login', { email, password })
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: message
        })
    }
}


export const signout = () => dispatch => {
   localStorage.removeItem('userInfo')
   dispatch({
       type: USER_SIGNOUT
   })
}