import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../adminLayout/SideBar';
import Navbar from '../adminLayout/NavBar';
import "./adminCourses.css";
import { DUMMY_DATA } from "../../dummyData/dummyData";
import { Link, useNavigate } from "react-router-dom";

export const AdminUpdateCourses = () => {
    const { productId } = useParams();
    const [types, setTypes] = useState('');
    const [nameProduct, setNameProduct] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        // Perform additional logic if needed
        setImage(file);
    };

    const handleSizeChange = (event) => {
        const { id, checked } = event.target;

        if (checked) {
            setSelectedSizes((prevSizes) => [...prevSizes, id]);
        } else {
            setSelectedSizes((prevSizes) => prevSizes.filter((size) => size !== id));
        }
    };

    const handleCancelEdit = (event) => {
        event.preventDefault();
        // Add logic to handle cancel edit
        navigate("/adminCourses");
    };

    const handleEditProduct = (event) => {
        event.preventDefault();
        // Add logic to edit the product
        // ...
    };

    useEffect(() => {
        // Add logic to fetch product details using productId and update state variables
        const productDetails = DUMMY_DATA.find(item => item.id === parseInt(productId));
        if (productDetails) {
            setTypes(productDetails.categories);
            setNameProduct(productDetails.name);
            setPrice(productDetails.price);
            setImage(productDetails.image);
            setSelectedSizes(productDetails.size);
            // Assuming color is available in the dummy data
            setSelectedColors(productDetails.color);
            setDescription(productDetails.description);
        }
    }, [productId]);

    return (
        <section id="content" className='adminPage'>
            <Sidebar />
            <Navbar />
            <main>
                <div className="head-title">
                    <div className="adminLeft">
                        <h1>Edit Courses</h1>
                        <ul class="breadcrumb">
                            <li>
                                <a href="#">Courses</a>
                            </li>
                            <li><i class='bx bx-chevron-right' ></i></li>
                            <li>
                                <a class="active" href="/adminCourses">Home</a>
                            </li>
                            <li><i class='bx bx-chevron-right' ></i></li>
                            <li>
                                <a class="active" href="#">Edit</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="updateProduct">
                    <form onSubmit={handleEditProduct} encType="multipart/form-data">
                        <label htmlFor="types">Select Terms:</label>
                        <select id="types" name="types">
                            <option value="T-shirts">Spring 2023</option>
                            <option value="Jackets">Summer 2023</option>
                            <option value="Pants">Fall 2023</option>
                            <option value="Accessories">Winter 2023</option>
                        </select><br />
                        <label htmlFor="types">Select Departments:</label>
                        <select id="types" name="types">
                            <option value="T-shirts">Computer Science</option>
                            <option value="Jackets">Business</option>
                            <option value="Pants">Economics</option>
                        </select><br />

                        <button type="button" name="cancelEditProduct" onClick={handleCancelEdit} style={{ marginRight: '10px' }} >Cancel</button>
                        <button type="submit" name="editProduct">Edit Item</button>
                    </form>
                </div>
            </main>
        </section>
    );
};

