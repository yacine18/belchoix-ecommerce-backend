import React from 'react'
import { Link, BrowserRouter, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import SigninScreen from './SigninScreen'

const App = () => {
  return (
    <BrowserRouter>
      <div className="container-fluid">
        <header>
          <div>
            <nav className="navbar navbar-light">
              <div>
                <Link to="/">
                  <img src="../images/logo.png" width="140" height="45" alt="belchoix" />
                </Link>
              </div>
              <div className="ml-auto">
                <Link to="/cart" className="mr-5">
                  <img src="../icons/shopping-cart.png" width="22" height="22" alt="cart" />
                </Link>
                <Link to="/signin" className="mr-3">
                  <img src="../icons/user.png" width="22" height="22" alt="cart" />
                </Link>
              </div>
            </nav>
          </div>
        </header>
        <main>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/signin" component={SigninScreen} />
        </main>
        <footer className="text-center">
          <div className="text-center p-4">
            © 2021 Copyright:
            <Link to="/">
              <a className="text-reset fw-bold" href="/">Belchoix</a>
            </Link>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App;
