import React from 'react';
import makeToast from "../Toaster";
import axios from 'axios';

const RegisterPage = (props) => {
  const nameRef = React.createRef();
  const emailRef = React.createRef();
  const passwordRef = React.createRef();

  const registerUser = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    axios
      .post("http://localhost:5000/user/register", {
        name,
        email,
        password,
      })
      .then((response) => {
        makeToast("success", response.data.message);
        localStorage.setItem("CC_Token", response.data.token);
        props.history.push('/dashboard');
      })
      .then((response) => console.log(response))
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div>

      <a href="/login">Se connecter</a>
      <br></br>
      <a href="/register">S'inscrire</a>
      <div className="card">
        <div className="cardHeader">Registration</div>
        <div className="cardBody">
          <div className="inputGroup">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="John Doe"
              ref={nameRef}
            />
          </div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="abc@example.com"
            ref={emailRef}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Your Password"
            ref={passwordRef}
          />
        </div>
        <button onClick={registerUser}>Register</button>
      </div>
    </div>
  );
};

export default RegisterPage;