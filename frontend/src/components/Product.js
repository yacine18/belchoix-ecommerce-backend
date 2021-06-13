import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {

    return (
        <div className="card ml-4 mr-4 mt-5 mb-5">
            <Link to={`/product/${product._id}`}>
                <img className="card-img-top p-4" src={product.image} alt={product.name} style={{ width: '100%', maxWidth: '18rem', height: '18rem' }}></img>
            </Link>

            <div className="card-body">
                <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: '#363636' }}>
                    <h5 className="card-title">{product.name}</h5>
                </Link>
                
                <Rating rating={product.rating} numReviews={product.numReviews} />
                <p className="card-text">${product.price}</p>
            </div>
        </div>
    )
}

export default Product
