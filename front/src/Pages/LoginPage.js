import React, { Component } from "react";
import makeToast from "../Toaster";
import axios from "axios";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
  }

  loginUser = (e) => {
    e.preventDefault();
    const email = this.emailRef.current.value;
    const password = this.passwordRef.current.value;

    axios
      .post("http://localhost:5000/user/login", {
        email,
        password,
      })
      .then((response) => {
        makeToast("success", response.data.message);
        localStorage.setItem("CC_Token", response.data.token);
        this.props.history.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        //   if (
        //     err &&
        //     err.response &&
        //     err.response.data &&
        //     err.response.data.message
        //   )
        makeToast("error", err.response.data.message);
      })
  }

  render() {
    return (
      <div>
        <a href="/login">Se connecter</a>
        <br></br>
        <a href="/register">S'inscrire</a>
        <br></br>
        <div className="card">
          <div className="cardHeader">Login</div>
          <div className="cardBody">
            <div className="inputGroup">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="abc@example.com"
                ref={this.emailRef}
              />
            </div>
            <div className="inputGroup">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Your Password"
                ref={this.passwordRef}
              />
            </div>
            <button onClick={this.loginUser}>Login</button>
          </div>
        </div>
      </div >
    );
  };
};


export default LoginPage;
