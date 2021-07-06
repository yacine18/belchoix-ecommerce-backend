import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Link } from "react-router-dom";
import { detailsOrder } from "../actions/orderActions";

const OrderScreen = (props) => {
  const orderId = props.match.params.id;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!order || (order && order._id !== orderId)) {
      dispatch(detailsOrder(orderId));
    }
  }, [dispatch, orderId, order]);

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox>{error}</MessageBox>
  ) : (
    <div className="row container mt-5 mb-5">
      <h2 className="container text-center">Order {order._id} </h2>
      <div className="container col-md-6">
        <div className="card mt-5">
          <div className="card-body" style={{ fontWeight: "bold" }}>
            Shipping Address
          </div>
          <div className="card-body">
            <strong>Name: </strong> {order.shippingAddress.fullName}, <strong>Address: </strong>{" "}
            {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
          </div>
        </div>
        <div className="card mt-5">
          <div className="card-body" style={{ fontWeight: "bold" }}>
            Payment
          </div>
          <div className="card-body">
            <strong>Method :</strong> {order.paymentMethod}
          </div>
        </div>
        <div className="card mt-5">
          <div className="card-body" style={{ fontWeight: "bold" }}>
            Order Items
          </div>
          <div className="card-body">
            <ul className="text-decoration-none">
              {order.orderItems.map((item) => (
                <li className="row mx-auto" key={item.product}>
                  <div>
                    <img
                      className="mr-auto mx-auto mt-3"
                      src={`/${item.image}`}
                      alt={item.name}
                      width="35"
                    />
                  </div>
                  <div className="mx-auto">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div className="ml-auto mx-auto">
                    {item.qty} x {item.price} = ${item.qty * item.price}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="card col-md-3 mt-5">
        <div
          className="card-body text-center mt-3"
          style={{ fontWeight: "bold" }}
        >
          Order Summary
        </div>
        <div className=" card-body">
          <div className="row">
            <div>Items</div>
            <div className="ml-auto">${order.itemsPrice.toFixed(2)}</div>
          </div>
          <div className="row">
            <div>Shipping</div>
            <div className="ml-auto">${order.shippingPrice.toFixed(2)}</div>
          </div>
          <div className="row">
            <div>Tax</div>
            <div className="ml-auto">${order.taxPrice.toFixed(2)}</div>
          </div>
          <div className="row mt-3">
            <div>
              <strong>Order Total</strong>
            </div>
            <div className="ml-auto">
              <strong>${order.totalPrice.toFixed(2)}</strong>
            </div>
          </div>
        </div>

        <div className="card-body"></div>
      </div>
    </div>
  );
};

export default OrderScreen;
