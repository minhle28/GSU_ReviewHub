import React, { useState, useEffect } from 'react';
import Sidebar from '../adminLayout/SideBar';
import Navbar from '../adminLayout/NavBar';
import "./adminCourses.css";
import { DUMMY_DATA } from "../../dummyData/dummyData";


export const AdminCourses = () => {
    const [image, setImage] = useState('');
    const [selectedSizes, setSelectedSizes] = useState([]);

    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [items, setItems] = useState(DUMMY_DATA);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const totalPages = Math.ceil(items.length / itemsPerPage);

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

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleAddProduct = (event) => {
        event.preventDefault();
        // Add logic to add a new product
        // ...
        closeModal();
    };

    useEffect(() => {
        const modalForm = document.getElementById("addModal");

        if (modalForm) {
            if (isModalOpen) {
                modalForm.style.display = "block";
            } else {
                modalForm.style.display = "none";
            }
        }
    }, [isModalOpen]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const startIndex = (totalPages - currentPage) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = items.slice(startIndex, endIndex);

    return (
        <section id="content" className='adminPage'>
            <Sidebar />
            <Navbar />
            <main className="content-main-product">
                <div className="head-title">
                    <div className="adminLeft">
                        <h1>Products</h1>
                        <ul class="breadcrumb">
                            <li>
                                <a href="#">Products</a>
                            </li>
                            <li><i class='bx bx-chevron-right' ></i></li>
                            <li>
                                <a class="active" href="#">Home</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <table id="items-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Size</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedItems.reverse().map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <a href={`products-details/${item.id}`}>
                                        <img src={item.image} alt="Product Image" />
                                    </a>
                                </td>
                                <td>{item.name}</td>
                                <td>${item.price.toFixed(2)}</td>
                                <td>{item.categories}</td>
                                <td>{item.size.join(', ')}</td>
                                <td>
                                    <div>
                                        <a className="edit" role="button" href={`adminUpdateProduct/${item.id}`}>
                                            Edit
                                        </a>
                                    </div>
                                    <form method="post" action="">
                                        <button className="delete" type="submit" name="deleteProduct" value={item.id}>
                                            Delete
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button id="add-btn" onClick={openModal}>
                    Add Item
                </button>

                {isModalOpen && (
                    <div id="addModal" className="modal-form">
                        <div id="popup-form" className="popup">
                            <h2 style={{ textAlign: 'center', color: '#3C91E6' }}>Add New Item</h2>
                            <form onSubmit={handleAddProduct} encType="multipart/form-data">
                                <label htmlFor="types">Categories:</label>
                                <select id="types" name="types">
                                    <option value="T-shirts">T-shirts</option>
                                    <option value="Jackets">Jackets</option>
                                    <option value="Pants">Pants</option>
                                    <option value="Accessories">Accessories</option>
                                </select><br />

                                <label htmlFor="name">Name:</label>
                                <input type="text" id="name" name="nameProduct" /><br />

                                <label htmlFor="price">Price:</label>
                                <input type="text" id="price" name="price" /><br /><br />

                                <label htmlFor="image">Image URL:</label><br />
                                <input type="file" name="image" onChange={handleImageChange} /><br /><br />

                                <label htmlFor="size">Size:</label>
                                <div className="checkbox-group" id="size">
                                    {/* Replace with your actual data source */}
                                    {['XS', 'S', 'M', 'L', 'XL'].map((name, index) => (
                                        <React.Fragment key={index}>
                                            <input
                                                type="checkbox"
                                                id={name}
                                                name="size[]"
                                                value={name}
                                                checked={selectedSizes.includes(name)}
                                                onChange={handleSizeChange}
                                            />
                                            <label htmlFor={name}>{name}</label>
                                        </React.Fragment>
                                    ))}
                                </div><br />

                                <label htmlFor="features">Features:</label>
                                <textarea id="description" name="description"></textarea><br />

                                <button id="close-btn" type="button" onClick={closeModal}>
                                    Close
                                </button>
                                <button type="submit" name="addProduct">
                                    Add Item
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                <div className="pagination">
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={currentPage === index + 1 ? 'active' : ''}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </main>
        </section>
    );
};
