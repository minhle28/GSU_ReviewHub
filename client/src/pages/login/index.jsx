import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import ClientAPI from "../../api/clientAPI";
import Cookies from 'js-cookie';

export const Login = () => {
    const navigate = useNavigate();
  
    const [user, setUser] = useState({
      email: "",
      password: "",
    }); 

    // Higher Order Component
    useEffect(()=>{
      // nvquang2
      if (Cookies.get("userID") !== undefined)
        navigate("/");
    })
   
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {    
        const respond = await ClientAPI.post("login",user);
        //console.log("From Login.js: ",respond.data);
        if(respond.data.userID !==undefined){
          Cookies.set("userID", respond.data.userID);
          Cookies.set("isAdmin", respond.data.isAdmin); 
          alert("Login success. Redirect to home page...")
          const timeout = setTimeout(() => {
            navigate("/");
            clearTimeout(timeout);
          }, 500);
        }
        else{
          alert("Login fail.")
        }
      } catch (error) {   
        alert(error);
        //console.log(error);
      }
    };
  
    const handleInputChange = (event, key) => {
      setUser((prev) => {
        return {
          ...prev,
          [key]: event.target.value,
        };
      });
    };
    return (
        <section id="login" className="signin">
            <div className="container">
                <div className="signin-content">
                    <div className="signin-image">
                        <figure>
                            <img src="signin-image.png" alt="sing up image" />
                        </figure>
                        <Link to="/register">
                            <a className="signup-image-link">
                                Don't have an account? <span style={{ fontWeight: '800' }}>Register here.</span>
                            </a>
                        </Link>
                    </div>
                    <div className="signin-form">
                        <h2 className="form-title">Login</h2>
                        <Form method="POST" className="register-form" id="login-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="your_name">
                                    <i className="zmdi zmdi-account material-icons-name" />
                                </label>
                                <input
                                    required
                                    type="email"
                                    value={user.email}
                                    onChange={(e) => handleInputChange(e, "email")}
                                    name="user_email"
                                    id="user_email"
                                    placeholder="Email"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="your_pass">
                                    <i className="zmdi zmdi-lock" />
                                </label>
                                <input
                                    required
                                    type="password"
                                    value={user.password}
                                    onChange={(e) => handleInputChange(e, "password")}
                                    name="user_password"
                                    id="user_password"
                                    placeholder="Password"
                                />
                            </div>
                            <div className="form-group form-button">
                                <input
                                    type="submit"
                                    name="signin"
                                    id="signin"
                                    className="form-submit"
                                    defaultValue="Log in"
                                />
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </section>

    );
}