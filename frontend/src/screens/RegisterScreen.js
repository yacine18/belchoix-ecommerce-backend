import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { register } from '../actions/userActions'
import AlertError from '../components/AlertError'
import LoadingBox from '../components/LoadingBox'

const RegisterScreen = props => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');

    // const redirect = props.location.search
    //     ? props.location.search.split('=')[1]
    //     : '/';

    const userRegister = useSelector(state => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    const dispatch = useDispatch()

    useEffect(() => {
        if (userInfo) {
            props.history.push('/')
        }
    }, [props, userInfo])

    const submitHandler = e => {
        e.preventDefault();
        dispatch(register(name, email, password, mobile ))
    }
    return (
        <>
            { loading && <LoadingBox></LoadingBox>}
            { error && <AlertError>{error}</AlertError>}
            <div className="card mt-4 mx-auto p-1" style={{ maxWidth: '28rem', width: '100%' }}>
                <h2 className="p-3 mt-2 text-center text-black" style={{ fontSize: '1.3rem' }}><i className="fas fa-user-plus mb-1"></i> Create Account</h2>
                <div className="card-body p-4">
                    <form onSubmit={submitHandler}>
                        <div className="form-group">
                            <label htmlFor="fullName">Full Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="fullName"
                                placeholder="Enter Full Name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                style={{ boxShadow: 'none' }}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mobile">Mobile</label>
                            <input
                                type="text"
                                className="form-control"
                                id="mobile"
                                placeholder="Ex: 066666666"
                                value={mobile}
                                onChange={e => setMobile(e.target.value)}
                                style={{ boxShadow: 'none' }}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
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
                                placeholder="Enter Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                style={{ boxShadow: 'none' }}
                                required
                            />
                        </div>
                        <button className="btn btn-warning btn-block" style={{boxShadow: 'none'}}>Submit</button>
                    </form>
                    <div>
                        <p className="mr-auto mt-2">Already Have an Account? <Link className="text-warning" to="/login">Login</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegisterScreen
