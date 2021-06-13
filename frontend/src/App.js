import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import ProductScreen from './screens/ProductScreen'
import RegisterScreen from './screens/RegisterScreen'
import { useDispatch, useSelector } from 'react-redux';
import { signout } from './actions/userActions';
import ProfileScreen from './screens/ProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import CartScreen from './screens/CartScreen';

const App = () => {

  const userSignin = useSelector(state => state.userSignin)
  const { userInfo } = userSignin;

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout())
  }
  return (
    <BrowserRouter>
      <div className="container mt-3">
        <header className="row">
          <div>
            <Link to="/"><img className="brand" src="./images/logo.png" width="170" height="55" alt="Belchoix" /></Link>
          </div>
          <div >
            <Link to="/cart" style={{ textDecorationLine: 'none' }}><i className="fas fa-shopping-cart" ></i>
              {
                cartItems.length > 0 && (
                  <span style={{
                    backgroundColor: '#ffc107',
                    color: '#363636',
                    borderRadius: '100%',
                    padding: '0.1rem 0.4rem',
                    fontSize: '0.7rem',
                    fontWeight: 'bold'
                  }}><strong >{cartItems.length}</strong></span>
                )
              }

            </Link>
            {
              userInfo ? (
                <div className="dropdown show d-inline">
                  <Link className="btn btn-secondary dropdown-toggle bg-white text-dark" style={{ borderColor: 'white', boxShadow: 'none' }} to="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-user-circle fa-lg"></i> {userInfo.name}
                  </Link>

                  <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <Link className="dropdown-item" to="/profile">Profile</Link>
                    <Link className="dropdown-item" to="/ordershistory">Orders History</Link>
                    <Link className="dropdown-item" to="/login" onClick={signoutHandler}>Logout</Link>
                  </div>
                </div>
              ) : (
                <Link to="/login" style={{ textDecoration: 'none' }}><i className="fas fa-user"></i> <strong className="login">Login</strong></Link>
              )
            }

          </div>
        </header>
        <main>
          <Route path="/" component={HomeScreen} exact ></Route>
          <Route path="/product/:id" component={ProductScreen}></Route>
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/profile/edit/:id" component={EditProfileScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
        </main>
        <footer className="row center mb-3">
          <div className="mx-auto"> &copy; <strong>Belchoix</strong>. 2021. All Right Reserved</div>
        </footer>
      </div>
    </BrowserRouter >
  )
}

export default App
