import React from "react";
import { Link } from "react-router-dom";
//import { Courses } from "../../pages/courses/";
import "./course_sidebar.css";
//import { ProductsDetails } from "../pages/products-details";

export const CourseSidebar = () => {
    return (
        <>
            <div className="menu-courses-container">
                <div className="menu-courses-nav">
                <h6>Parameters</h6>
                <hr />
                    <ul className="menu-courses-list">
                        <li>
                            <Link to="/Styles">Best Seller</Link>
                        </li>
                        <li>
                            <Link to="/products?page=1">Products</Link>
                        </li>
                    </ul>
                </div>
                {/* 
        <Products>
          <ProductsDetails />
        </Products>
*/}
            </div>
        </>
    );
};