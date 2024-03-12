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
        navigate("/adminProduct");
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
                        <h1>Edit Product</h1>
                    </div>
                </div>

                <div className="updateProduct">
                    <form onSubmit={handleEditProduct} encType="multipart/form-data">
                        <label htmlFor="types">Categories:</label>
                        <select id="types" name="types" value={types} onChange={(e) => setTypes(e.target.value)}>
                            <option value="T-shirts">T-shirts</option>
                            <option value="Jackets">Jackets</option>
                            <option value="Pants">Pants</option>
                            <option value="Accessories">Accessories</option>
                        </select><br />

                        <label htmlFor="name">Name:</label>
                        <input type="text" name="nameProduct" value={nameProduct} onChange={(e) => setNameProduct(e.target.value)} /><br />

                        <label htmlFor="price">Price:</label>
                        <input type="text" name="price" value={price} onChange={(e) => setPrice(e.target.value)} /><br /><br />

                        <img src={image} alt="Product Image" width="200" /><br />
                        <label htmlFor="image">Image URL:</label><br />
                        <input type="file" name="image" onChange={handleImageChange} /><br /><br />

                        <label htmlFor="size">Size:</label>
                        <div className="checkbox-group" id="size">
                            {['XS', 'S', 'M', 'L', 'XL'].map((name, index) => (
                                <React.Fragment key={index}>
                                    <input
                                        type="checkbox"
                                        id={name}
                                        name="size[]"
                                        value={name}
                                        //checked={selectedSizes.includes(name)}
                                        onChange={handleSizeChange}
                                    />
                                    <label htmlFor={name}>{name}</label>
                                </React.Fragment>
                            ))}
                        </div><br />

                        <label htmlFor="description">Features:</label>
                        <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea><br />

                        <button type="button" name="cancelEditProduct"  onClick={handleCancelEdit} style={{ marginRight: '10px' }} >Cancel</button>
                        <button type="submit" name="editProduct">Edit Item</button>
                    </form>
                </div>
            </main>
        </section>
    );
};

