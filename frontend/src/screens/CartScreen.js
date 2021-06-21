import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../actions/cartActions'
import { Link } from 'react-router-dom'
import MessageBox from '../components/MessageBox'

const CartScreen = props => {
    const productId = props.match.params.id

    const [qty, setQty] = useState(1)
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    const dispatch = useDispatch()
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }

    }, [dispatch, qty, productId])
    return (
        <div className="container mt-5">
            {
                cartItems.length === 0 ? (
                    <MessageBox variant="warning">
                        Cart is Empty. <Link to="/">Go to Shopping</Link>

                    </MessageBox>
                ) : (

                    <div className="row" style={{ justifyContent: 'space-between' }}>
                        <div className="col-md-6 mt-5 py-5">
                            {
                                cartItems.map(item => (
                                    <div key={item.product} className="row mt-3" style={{ justifyContent: 'space-between' }}>
                                        <Link to={`/product/${item.product}`}>
                                            <img src={`/${item.image}`} width="75" alt="iphone" />
                                        </Link>
                                        <Link to={`/product/${item.product}`} style={{ textDecoration: 'none' }}>
                                            <h2 className="my-auto">{item.name}</h2>
                                        </Link>
                                        <select
                                            value={item.qty}
                                            onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                            className="mb-4 p-3 my-4"
                                            style={{ borderRadius: '0.5rem', boxShadow: 'none' }}
                                        >
                                            {[...Array(item.countInStock).keys()].map(
                                                (x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                        <h2>${item.price}</h2>
                                        <button
                                            type="button"
                                            className="btn btn-danger my-4 py-1"
                                            style={{ fontSize: '1.5rem', borderRadius: '0.5rem' }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))
                            }

                        </div>

                        <div className=" col-md-4 mt-5">
                            <div className="mt-5 py-2">
                                <strong style={{ fontSize: '1.8rem' }}>
                                    Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) :
                                    ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                                </strong>
                            </div>
                            <div className="mt-2">
                                <button
                                    type="button"
                                    className="btn btn-block btn-warning"
                                    style={{ fontSize: '1.7rem', fontWeight: 'bold', boxShadow: 'none' }}
                                >
                                    Proceed To Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }


        </div >
    )
}

export default CartScreen
