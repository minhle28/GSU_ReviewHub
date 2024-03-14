import React from 'react'
import './register.css';
import { Link } from 'react-router-dom';


export const Register = () => {
    return (
        <section id="register" className="signup">
            <div className="container">
                <div className="signup-content">
                    <div className="signup-form">
                        <h2 className="form-title">Register</h2>
                        <form method="POST" className="register-form" id="register-form">
                            <div className="form-group">
                                <label htmlFor="email">
                                    <i className="zmdi zmdi-email" />
                                </label>
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    id="email"
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
                                    name="pass"
                                    id="pass"
                                    placeholder="Password"
                                />
                            </div>
                            {/*
                            <div className="form-group">
                                <input
                                    required
                                    type="checkbox"
                                    name="agree-term"
                                    id="agree-term"
                                    className="agree-term"
                                />
                                <label htmlFor="agree-term" className="label-agree-term">
                                    <span>
                                        <span />
                                    </span>
                                    I agree all statements in{" "}
                                    <a href="#" className="term-service">
                                        Terms of service
                                    </a>
                                </label>
                            </div>
                            */}

                            <div className="form-group form-button">
                                <input
                                    type="submit"
                                    name="signup"
                                    id="signup"
                                    className="form-submit"
                                    defaultValue="Register"
                                />
                            </div>
                        </form>
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