import React from 'react'
import './login.css';
import { Link } from 'react-router-dom';

export const Login = () => {
    return (
        <section className="signin">
            <div className="container">
                <div className="signin-content">
                    <div className="signin-image">
                        <figure>
                            <img src="images/signin-image.jpg" alt="sing up image" />
                        </figure>
                        <Link to="/register">
                            <a className="signup-image-link">
                                Create an account
                            </a>
                        </Link>
                    </div>
                    <div className="signin-form">
                        <h2 className="form-title">Login</h2>
                        <form method="POST" className="register-form" id="login-form">
                            <div className="form-group">
                                <label htmlFor="your_name">
                                    <i className="zmdi zmdi-account material-icons-name" />
                                </label>
                                <input
                                    type="text"
                                    name="your_name"
                                    id="your_name"
                                    placeholder="Email"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="your_pass">
                                    <i className="zmdi zmdi-lock" />
                                </label>
                                <input
                                    type="password"
                                    name="your_pass"
                                    id="your_pass"
                                    placeholder="Password"
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="checkbox"
                                    name="remember-me"
                                    id="remember-me"
                                    className="agree-term"
                                />
                                <label htmlFor="remember-me" className="label-agree-term">
                                    <span>
                                        <span />
                                    </span>
                                    Remember me
                                </label>
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
                        </form>
                    </div>
                </div>
            </div>
        </section>

    );
}