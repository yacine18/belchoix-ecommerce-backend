import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { listProduct } from '../actions/productActions';
import AlertError from '../components/AlertError';
import LoadingBox from '../components/LoadingBox';
import Product from '../components/Product';

const HomeScreen = () => {

    const productList = useSelector(state => state.productList);
    const { loading, products, error } = productList;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProduct({}));
    }, [dispatch])

    return (
        <div>


            {
                products && products.map(product => (
                    <div class="carousel-item">
                        <img src="..." alt="..." />
                        <div class="carousel-caption d-none d-md-block">
                            <h5>...</h5>
                            <p>...</p>
                        </div>
                    </div>
                ))
            }

            {/* 2500px by 1250px */}



            <>
                {
                    loading ? (<LoadingBox></LoadingBox>)
                        :
                        error ? (<AlertError>{error}</AlertError>)
                            : (
                                <div className="row center mt-2 mb-5">
                                    {products.map(product => (
                                        <Product key={product._id} product={product} />
                                    ))}
                                </div>
                            )

                }

            </>
        </div>
    )
}

export default HomeScreen
