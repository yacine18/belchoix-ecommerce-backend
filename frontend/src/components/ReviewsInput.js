import React from 'react'

const ReviewsInput = () => {
    return (
        <div className=" mt-5 p-4"  style={{width: '100%'}} >
            <h4 className="text-warning mr-4" style={{fontSize: '1.2rem'}}>Write a Review</h4>
            <form className="mt-3">
                <div className="form-group">
                    <label>Full Name</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Your Name" />
                </div>
                <div className="form-group mt-5">
                    <label>Comment</label>
                    <textarea type="text" className="form-control" rows="4" id="exampleInputPassword1" placeholder="Enter a Comment" />
                </div>
                <button type="submit" className="btn btn-warning btn-block">Add Review</button>
            </form>
        </div>
    )
}

export default ReviewsInput
