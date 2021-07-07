import React from "react";

const OrdersMine = () => {
  return (
    <div className="container mt-5">
      <strong>Orders History</strong>
      <table className="table mt-5">
        <thead>
          <tr>
            <th scope="col">Order #</th>
            <th scope="col">Date</th>
            <th scope="col">Total</th>
            <th scope="col">Paid</th>
            <th scope="col">Delivered</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>
                <button className="btn btn-warning" style={{fontSize: '1.4rem'}}>Details</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrdersMine;
