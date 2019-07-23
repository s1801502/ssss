import React from "react";
import "./App.css";
import Homepage from "./pages/homepage/homepage.component";
import { Switch, Route, Redirect } from "react-router-dom";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import CheckoutPage from './pages/checkout/checkout.component'
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from './redux/user/user.selectors'
import { createStructuredSelector } from 'reselect'

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async currentUser => {
      if (currentUser) {
        const userRef = await createUserProfileDocument(currentUser);
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          });
        });
      }
      else setCurrentUser(currentUser)
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {

    const { currentUser } = this.props

    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route exact path="/signin" render={() => (currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />)} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const setDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  mapStateToProps,
  setDispatchToProps
)(App);
