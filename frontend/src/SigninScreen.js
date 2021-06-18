import React from 'react'

const SigninScreen = () => {
    return (
        <div className="container">
            <form className="col-md-5 mt-3 ml-5 mr-5 my-auto px-2">
                <div className="form-group">
                    <label for="email">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label for="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-warning btn-block">Submit</button>
            </form>
        </div>
    )
}

export default SigninScreen
