import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { detailsProduct } from '../actions/productActions'
import ReviewsInput from '../components/ReviewsInput'
import LoadingBox from '../components/LoadingBox';
import AlertError from '../components/AlertError';
import Rating from '../components/Rating'


const ProductScreen = props => {

    const [qty, setQty] = useState('1')

    const productId = props.match.params.id;

    const productDeatils = useSelector(state => state.productDeatils);
    const { loading, error, product } = productDeatils;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsProduct(productId))
    }, [dispatch, productId])

    const addToCartHandler = () => {
        props.history.push(`/cart/${props.match.params.id}?qty=${qty}`);
    }

    return (
        <>
            {
                loading ? (<LoadingBox></LoadingBox>)
                    :
                    error ? (<AlertError>{error}</AlertError>)
                        :
                        (
                            <div className="row p-5 mt-4 flex-row" style={{ width: '100%' }}>
                                <div className=" card mr-auto mx-auto">
                                    <img className="card-img-top" src={product.image} alt={product.name}></img>
                                </div>
                                <div className=" card-body mb-5 ml-5">
                                    <h5 className="card-title" style={{ fontSize: '1.4rem' }}>{product.name}</h5>
                                    <div>
                                        <p>Brand: {product.brand}</p>
                                    </div>

                                    <div className="d-flex flex-row">
                                        <div className="text-dark">
                                            <Rating rating={product.rating} numReviews={product.numReviews} />
                                        </div>

                                    </div>

                                    <p className="card-text mt-3" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>${product.price}</p>
                                    {
                                        product.countInStock > 0 ? (
                                            <>
                                                <div className="d-flex flex-row">
                                                    <strong>Status</strong>
                                                    <p className="text-success ml-3 flex-row">In Stock</p>
                                                </div>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <label
                                                            className="input-group-text"
                                                            htmlFor="inputGroupSelect01"
                                                            style={{ backgroundColor: '#ffc107', fontWeight: 'bold', fontSize: '0.8rem' }}>
                                                            Qty</label>
                                                    </div>
                                                    <div style={{ width: '10rem', textAlignLast: 'center' }}>
                                                        <select
                                                            className="custom-select"
                                                            value={qty}
                                                            id="inputGroupSelect01"
                                                            onChange={e => setQty(e.target.value)}
                                                        >
                                                            {[...Array(product.countInStock).keys()].map(
                                                                x => (
                                                                    <option key={x + 1} value={x + 1}>
                                                                        {x + 1}
                                                                    </option>
                                                                )
                                                            )}
                                                        </select>
                                                    </div>

                                                </div>
                                                <button
                                                    className="btn btn-warning p-2"
                                                    style={{ width: '13.3rem' }}
                                                    onClick={addToCartHandler}
                                                >
                                                    <i className="fas fa-cart-plus mx-auto"></i> Add to Cart

                                                  </button>
                                            </>

                                        )
                                            :
                                            (
                                                <>
                                                    <div className="d-flex flex-row">
                                                        <strong>Status</strong>
                                                        <p className="text-danger ml-3 flex-row">Out of Stock</p>
                                                    </div>

                                                </>
                                            )
                                    }


                                </div>
                                <div className="card p-1 mt-5 mx-auto" style={{ width: '100%' }}>
                                    <h4 className="p-2 ml-2 text-warning" style={{ fontSize: '1.1rem' }}>Description</h4>
                                    <div className="card-body mr-auto">
                                        <p>
                                            {product.description}
                                        </p>
                                    </div>

                                </div>
                                <ReviewsInput />
                            </div>
                        )
            }


        </>
    )
}

export default ProductScreen
