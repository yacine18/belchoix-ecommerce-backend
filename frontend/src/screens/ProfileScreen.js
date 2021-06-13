import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AlertError from '../components/AlertError';
import LoadingBox from '../components/LoadingBox';

const ProfileScreen = () => {

    const userSignin = useSelector(state => state.userSignin);
    const { loading, error, userInfo } = userSignin;

    return (
        <div className="d-flex">
            { loading && <LoadingBox></LoadingBox>}
            { error && <AlertError>{error}</AlertError>}
            <div className="card mt-4 mx-auto p-1" style={{ maxWidth: '28rem', width: '100%' }}>
                <h2 className="p-3 mt-2 text-center text-black" style={{ fontSize: '1.3rem' }}> <i class="far fa-id-card"></i> Your Account</h2>
                <div className="card-body p-4">
                    <div>
                        <strong>Name</strong> <p>{userInfo.name}</p>
                    </div>
                    <div>
                        <strong>Email</strong> <p>{userInfo.email}</p>
                    </div>
                    <div>
                        <strong>Mobile</strong> <p>{userInfo.mobile}</p>
                    </div>
                    <div>
                        <label />
                        <Link className="text-decoration-none" to="/edit">
                            <button className="btn btn-warning btn-block">
                                Edit Information
                        </button>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileScreen
