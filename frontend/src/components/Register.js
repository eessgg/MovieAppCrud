import React from "react";
import Joi from 'joi-browser';
import Form from './commons/Form';

class Register extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = () => {
    console.log("submitted");
  };  

  render() {
    return (
      <div className="container text-center">
        <form onSubmit={this.handleSubmit} className="form-signin">
          <img
            className="mb-4"
            src="https://icons-for-free.com/iconfiles/png/512/linecolor+version+svg+confetti-1319964493141079220.png"
            alt="as"
            width="72"
            height="72"
          />

          <h1 className="h1 text-light mb-3 font-weight-normal">Register</h1>

          {this.renderInput("username", "Username", "text")}

          {this.renderInput("password", "Password", "password")}

          {this.renderInput("name", "Name", "text")}

          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default Register;
