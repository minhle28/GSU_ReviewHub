import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../adminLayout/SideBar';
import Navbar from '../adminLayout/NavBar';
import "./adminTerms.css";
import { DUMMY_DATA } from "../../dummyData/dummyData";
import { Link, useNavigate } from "react-router-dom";

export const AdminUpdateTerms = () => {
    const { productId } = useParams();
    const [types, setTypes] = useState('');
    const [nameProduct, setNameProduct] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleCancelEdit = (event) => {
        event.preventDefault();
        // Add logic to handle cancel edit
        navigate("/adminTerms");
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
                        <h1>Edit Terms</h1>
                        <ul class="breadcrumb">
                            <li>
                                <a href="#">Terms</a>
                            </li>
                            <li><i class='bx bx-chevron-right' ></i></li>
                            <li>
                                <a class="active" href="/adminTerms">Home</a>
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
                        <label htmlFor="name">Term:</label>
                        <input type="text" id="name" name="nameProduct" /><br />

                        <button type="button" name="cancelEditProduct" onClick={handleCancelEdit} style={{ marginRight: '10px' }} >Cancel</button>
                        <button type="submit" name="editProduct">Edit Item</button>
                    </form>
                </div>
            </main>
        </section>
    );
};

