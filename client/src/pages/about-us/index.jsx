import React from 'react'
import './about.css';
import { Link } from 'react-router-dom';

export const AboutUs = () => {
    return (
        <div id="about-us">
            <img className="image" src="banner_1.png" alt="Bad Habbit"></img>
            <div className="about">
                <h1>About Us</h1>
                <hr />
                <br />
                <br />
                <br />
                <div className="services">
                    <h2>Services</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <ul className="service-list">
                        <li>
                            <h3>Title</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </li>
                        <li>
                            <h3>Title</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </li>
                        <li>
                            <h3>Title</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </li>
                    </ul>
                </div>
                <br />
                <br />
                <div className="why-choose-us">
                    <h2>Why Choose Us</h2>
                    <div className="left">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>
                    <div className="right">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>
                </div>
                <div className="customer-attraction">
                    <h2>Customer Attraction</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <ul>
                        <li>Lorem ipsum dolor sit amet</li>
                        <li>Consectetur adipiscing elit</li>
                        <li>Sed do eiusmod tempor incididunt</li>
                        <li>Ut labore et dolore magna aliqua</li>
                        <li>Ut enim ad minim veniam</li>
                    </ul>
                    <br />
                    <br />
                    <br />
                    <span>
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    </span>
                    <br />
                    <br />
                    <br />
                    <br />
                    <a href="/" className="button">
                        Back to Home
                    </a>
                </div>
            </div>

        </div>
    );
}