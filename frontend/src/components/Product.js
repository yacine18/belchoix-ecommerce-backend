import React from 'react'

const Product = ({ product }) => {
    return (
        <div class="card mt-4 my-2 col-md-3 ml-4 mr-5">
          <div class="card-body">
            <img src={product.image} alt={product.name} />
            <h5 class="card-title">{product.name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{product.price}</h6>
            <p class="card-text">{product.description}</p>
            <a type="btn btn-primary btn-block" href="/cart" class="card-link">Add To Cart</a>
          </div>
        </div>
    )
}

export default Product
