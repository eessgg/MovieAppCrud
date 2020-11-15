import React, { Component } from "react";
import Joi from 'joi-browser';
import Form from './commons/Form';

class Login extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = () => {
    console.log('submitted')
  }

  render() {
    return (
      <div className="container text-center">
        <div className="m-2 text-light bg-transparent">
          <h1>Login</h1>
        </div>
        <form onSubmit={this.handleSubmit} className="form-signin">
          <img
            className="mb-4"
            src="https://icons-for-free.com/iconfiles/png/512/linecolor+version+svg+confetti-1319964493141079220.png"
            alt="as"
            width="72"
            height="72"
          />

          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

          {this.renderInput("username", "Username", "text")}

          {this.renderInput("password", "Password", "password")}
          
          {this.renderInput("password", "Name", "password")}

          {this.rederButton("Register")}
        </form>
      </div>
    );
  }
}

export default Login;
