import React from 'react'
import './login.css';
import { Link } from 'react-router-dom';

export const Login = () => {
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
                        <form method="POST" className="register-form" id="login-form">
                            <div className="form-group">
                                <label htmlFor="your_name">
                                    <i className="zmdi zmdi-account material-icons-name" />
                                </label>
                                <input
                                    required
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
                                    required
                                    type="password"
                                    name="your_pass"
                                    id="your_pass"
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
                        </form>
                    </div>
                </div>
            </div>
        </section>

    );
}