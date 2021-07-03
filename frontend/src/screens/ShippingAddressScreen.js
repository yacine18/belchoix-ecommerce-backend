import React, { useState } from "react";
import { useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingAddressScreen = (props) => {

  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  if (!userInfo) {
    props.history.push("/signin");
  }

  const submitHandler = e => {
      e.preventDefault()
      props.history.push('/payment')
  }
  return (
    <div>
      <CheckoutSteps step1 step2 />
      <form
        className="col-md-5 mt-5 ml-5 mr-5 my-auto px-2 mx-auto"
        onSubmit={submitHandler}
      >
        <div className="form-group">
          <label htmlFor="fullName" style={{ fontSize: "1.8rem" }}>
            Full Name
          </label>
          <input
            type="text"
            className="form-control p-2"
            id="fullName"
            placeholder="Enter Full Name"
            style={{ fontSize: "1.8rem", boxShadow: "none" }}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address" style={{ fontSize: "1.8rem" }}>
            Address
          </label>
          <input
            type="text"
            className="form-control p-2"
            id="address"
            placeholder="Enter Address"
            style={{ fontSize: "1.8rem", boxShadow: "none" }}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="city" style={{ fontSize: "1.8rem" }}>
            City
          </label>
          <input
            type="text"
            className="form-control p-2"
            id="city"
            aria-describedby="emailHelp"
            placeholder="Enter City"
            style={{ fontSize: "1.8rem", boxShadow: "none" }}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="postalCode" style={{ fontSize: "1.8rem" }}>
            Postal Code
          </label>
          <input
            type="text"
            className="form-control p-2"
            id="postalCode"
            placeholder="Postal Code"
            style={{ fontSize: "1.8rem", boxShadow: "none" }}
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="country" style={{ fontSize: "1.8rem" }}>
            Country
          </label>
          <input
            type="text"
            className="form-control p-2"
            id="country"
            placeholder="Country"
            style={{ fontSize: "1.8rem", boxShadow: "none" }}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
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

export default ShippingAddressScreen;
