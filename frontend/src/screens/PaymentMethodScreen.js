import React from "react";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentMethodScreen = (props) => {

  const submitHandler = e => {
      e.preventDefault()
      props.history.push('/placeorder')
  }
  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <form className="container col-md-6" onSubmit={submitHandler}>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
          />
          <label className="form-check-label ml-2" htmlFor="flexRadioDefault1">
           PayPal
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
          />
          <label className="form-check-label ml-2" htmlFor="flexRadioDefault1">
           Cash On Delivery
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-warning btn-block"
          style={{ fontSize: "1.8rem" }}
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default PaymentMethodScreen;
