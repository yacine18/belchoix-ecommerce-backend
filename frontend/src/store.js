import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { productDetailsReducer, productListReducer } from './reducers/productReducer'
import { userRegisterReducer, userSigninReducer } from './reducers/userReducer'


const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    }
}

const reducer = combineReducers({
    productList: productListReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    productDetails: productDetailsReducer
})

const composeEnhanser = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    reducer,
    initialState,
    composeEnhanser(applyMiddleware(thunk))
)

export default store