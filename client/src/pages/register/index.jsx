import React, { useEffect, useState } from "react";
import {
    Button,
    Container,
    Form,
  } from "react-bootstrap";
import './register.css';
import { Link, useNavigate } from 'react-router-dom';
import ClientAPI from "../../api/clientAPI";
import Cookies from "js-cookie";


export const Register = () => {
    const [user, setUser] = useState({
        fullName: "",
        email: "",
        password: "",
      });
      
      const navigate = useNavigate();
      useEffect(() => {
        if (Cookies.get("userID") !== undefined)
          navigate("/");
      })
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          
          if (!user.email || !user.password || !user.fullName) {
            return alert("Please enter your information!")
          }
          await ClientAPI.post("register", user);
          //console.log("From register.jsx: ",respond);      
          alert("Register success. Redirect to login page...")      
          const timeout = setTimeout(() => {
            navigate("/login");
            clearTimeout(timeout);
          }, 500);
    
        } catch (error) {
          //console.log(error);
          alert("Register Fail") 
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
        <section id="register" className="signup">
            <div className="container">
                <div className="signup-content">
                    <div className="signup-form">
                        <h2 className="form-title">Register</h2>
                        <Form method="POST" className="register-form" id="register-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name"> 
                                    <i className="zmdi zmdi-account material-icons-name" />
                                </label>
                                <input
                                    required
                                    type="name"
                                    value={user.fullName}
                                    onChange={(e) => handleInputChange(e, "fullName")}
                                    name="name"
                                    id="user_name"
                                    placeholder="Full Name"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email"> 
                                    <i className="zmdi zmdi-email" />
                                </label>
                                <input
                                    required
                                    type="email"
                                    value={user.email}
                                    onChange={(e) => handleInputChange(e, "email")}
                                    name="email"
                                    id="user_email"
                                    placeholder="Email"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="pass">
                                    <i className="zmdi zmdi-lock" />
                                </label>
                                <input
                                    required
                                    type="password"
                                    value={user.password}
                                    onChange={(e) => handleInputChange(e, "password")}
                                    name="password"
                                    id="user_password"
                                    placeholder="Password"
                                />
                            </div>

                            <div className="form-group form-button">
                                <input
                                    type="submit"
                                    name="signup"
                                    id="signup"
                                    className="form-submit"
                                    defaultValue="Register"
                                />
                            </div>
                        </Form>
                    </div>
                    <div className="signup-image">
                        <figure>
                            <img src="signup-image.png" alt="sing up image" />
                        </figure>
                        <Link to="/login">
                        <a href="#" className="signup-image-link">
                                Already have an account? <span style={{ fontWeight: '800' }}>Login.</span>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}