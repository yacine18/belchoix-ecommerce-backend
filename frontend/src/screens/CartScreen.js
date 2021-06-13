import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import AlertError from '../components/AlertError';
import { addToCart } from '../actions/cartActions'

const CartScreen = props => {

    const productId = props.match.params.id;
    const qty = props.location.search
        ? Number(props.location.search.split('=')[1])
        : 1;

    const cart = useSelector(state => state.cart);
    const { cartItems, error } = cart;

    const dispatch = useDispatch();

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])
    return (
        <div className="d-flex flex-row" style={{ width: '100%' }}>
            {error && (<AlertError>{error}</AlertError>)}
            {
                cartItems.length > 0 ? (
                    <div className=" card d-flex p-3 mt-5" style={{ width: '100%', maxWidth: "45rem" }}>
                        {
                            cartItems.map(item => (
                                <>
                                    <div>
                                        <img src={item.image} alt={item.name} style={{ maxWidth: '3rem' }} />
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '1rem', fontWeight: 'bold', marginTop: '1rem', marginLeft: '2rem', width: '100%' }}> {item.name} </p>
                                    </div>
                                    <div style={{ marginTop: '0.8rem', marginLeft: '2.2rem' }}>
                                        <select
                                            value={item.qty}
                                            className="p-2" 
                                            onChange={(e) =>
                                                dispatch(
                                                    addToCart(item.product, Number(e.target.value))
                                                )
                                            }
                                        >
                                            {[...Array(item.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div style={{ marginTop: '1rem', marginLeft: '2rem', fontSize: '1.1rem' }}>
                                        <p>${item.price}</p>
                                    </div>
                                    <div style={{ marginTop: '0.8rem', marginLeft: '4.7rem', }}>
                                        <button type="button" className="btn btn-danger">
                                            Delete
                                       </button>
                                    </div>
                                </>
                            ))
                        }

                    </div>

                ) : (
                    <div className="mt-5 mx-auto p-5">
                        <h6>
                            Cart is Empty. <Link to="/" className="text-decoration-none">Go to Shopping</Link>
                        </h6>
                    </div>

                )

            }

            <div className="card p-3 mt-5 ml-auto" style={{ width: '100%', maxWidth: '20rem', height: '16vh' }}>
                <h2 style={{ fontSize: '1.1rem' }}>
                    Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
                    {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                </h2>

                <div className="p-1 mt-3">
                    <button
                        className=" btn btn-warning btn-block"
                        disabled={cartItems.length === 0}
                        style={{ boxShadow: 'none' }}
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CartScreen
