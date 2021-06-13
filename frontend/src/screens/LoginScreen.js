import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { signin } from '../actions/userActions';
import AlertError from '../components/AlertError';
import LoadingBox from '../components/LoadingBox';

const LoginScreen = props => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const redirect = props.location.search
    //     ? props.location.search.split('=')[1]
    //     : '/';

        const userSignin = useSelector(state => state.userSignin)
        const { userInfo, loading, error } = userSignin;

    const dispatch = useDispatch();

    useEffect(() => {
        if (userInfo) {
            props.history.push('/');
        }
    }, [props, userInfo])

    const submitHandler = e => {
        e.preventDefault();
        dispatch(signin(email, password));
    }
    return (
        <div className="mt-5">
            {loading && <LoadingBox></LoadingBox>}
            {error && <AlertError>{error}</AlertError>}
            <div className="card mt-4 mx-auto p-1" style={{ maxWidth: '28rem', width: '100%' }}>
                <h2 className="p-3 mt-2 text-center text-black" style={{ fontSize: '1.3rem' }}><i class="fas fa-sign-in-alt"></i> Login</h2>
                <div className="card-body p-4">
                    <form onSubmit={submitHandler}>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                aria-describedby="emailHelp"
                                placeholder="Enter email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                style={{ boxShadow: 'none' }}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                style={{ boxShadow: 'none' }}
                                required
                            />
                        </div>
                        <button className="btn btn-warning btn-block" style={{boxShadow: 'none'}}>Login</button>
                    </form>
                    <div>
                        <p className="mr-auto mt-2">Haven't an Account? <Link className="text-warning" to="/register">Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen
