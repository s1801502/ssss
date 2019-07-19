import React from "react";
import "./sign-up.styles.scss";

import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";

class SignUp extends React.Component {
  state = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = async e => {
      e.preventDefault()

      const { displayName, email, password, confirmPassword } = this.state;

      if (password !== confirmPassword) {
          alert("passwords do not match")
          return
      }

      try {
        const {user} = await auth.createUserWithEmailAndPassword(email, password)
        await createUserProfileDocument(user, {displayName})
  
        this.setState({
          displayName: "",
          email: "",
          password: "",
          confirmPassword: ""
        })
      } catch (error) {
          console.error(error.message)
      }

      
     
  }

  render() {
    const { displayName, email, password, confirmPassword } = this.state;

    return (
      <div className="sign-up">
        <h2 className="title">I do not have an account</h2>
        <span>Sign up with your email and a password</span>

        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            value={displayName}
            name="displayName"
            onChange={this.handleChange}
            label="Display name"
            required
          />

          <FormInput
            type="email"
            value={email}
            name="email"
            onChange={this.handleChange}
            label="Email"
            required
          />

          <FormInput
            type="password"
            value={password}
            name="password"
            onChange={this.handleChange}
            label="Password"
            required
          />

          <FormInput
            type="password"
            value={confirmPassword}
            name="confirmPassword"
            onChange={this.handleChange}
            label="Confirm password"
            required
          />
          <CustomButton type="submit">Sign Up</CustomButton>
        </form>
      </div>
    );
  }
}

export default SignUp;
