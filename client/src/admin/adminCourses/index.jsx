import React, { useState, useEffect } from 'react';
import Sidebar from '../adminLayout/SideBar';
import Navbar from '../adminLayout/NavBar';
import "./adminCourses.css";
import { DUMMY_DATA } from "../../dummyData/dummyData";

export const AdminCourses = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 10;
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = DUMMY_DATA.slice(indexOfFirstCourse, indexOfLastCourse);

    const paginate = pageNumber => {
        if (pageNumber < 1 || pageNumber > Math.ceil(DUMMY_DATA.length / coursesPerPage)) {
            return;
        }
        setCurrentPage(pageNumber);
    };

    const [image, setImage] = useState('');
    const [selectedSizes, setSelectedSizes] = useState([]);

    const itemsPerPage = 10;
    const [items, setItems] = useState(DUMMY_DATA);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const totalPages = Math.ceil(items.length / itemsPerPage);

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

    const startIndex = (totalPages - currentPage) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = items.slice(startIndex, endIndex);

    return (
        <section id="content" className='adminPage course'>
            <Sidebar />
            <Navbar />
            <main className="content-main-product">
                <div className="head-title">
                    <div className="adminLeft">
                        <h1>Courses</h1>
                        <ul class="breadcrumb">
                            <li>
                                <a href="#">Courses</a>
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
                            <th>ID</th>
                            <th>CRN</th>
                            <th>Name</th>
                            <th>Instructor</th>
                            <th>Terms</th>
                            <th>Departments</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedItems.reverse().map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.name}</td>
                                <td>{item.name}</td>
                                <td>{item.name}</td>
                                <td>{item.name}</td>
                                <td>
                                    <a class="edit" role="button" href={`adminUpdateCourses/${item.id}`}>
                                        Edit
                                    </a>
                                    <form method="post" action="">
                                        <button class="delete" type="submit" name="deleteProduct" value={item.id}>
                                            Delete
                                        </button>
                                    </form>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>

                <button id="add-btn" onClick={openModal}>
                    Add New
                </button>

                {isModalOpen && (
                    <div id="addModal" className="modal-form">
                        <div id="popup-form" className="popup">
                            <h2 style={{ textAlign: 'center', color: 'var(--blue)' }}>Add Data</h2>
                            <br />
                            <form onSubmit={handleAddProduct} encType="multipart/form-data">
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


                                <label htmlFor="file">Upload Excel File: </label><br />
                                <input type="file" id="file" name="excelFile" accept=".xlsx, .xls" /><br /><br />

                                <button id="close-btn" type="button" onClick={closeModal}>
                                    Close
                                </button>
                                <button type="submit" name="addProduct">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                )}
                <br /><br />
                <div className='page-number-admin'>
                    <div aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className={`page-item ${currentPage <= 1 ? 'disabled' : ''}`}>
                                <a className="page-link" href={`#${currentPage - 1}`} onClick={() => paginate(currentPage - 1)} aria-label="Previous">
                                    <span aria-hidden="true">«</span>
                                </a>
                            </li>
                            {[...Array(Math.ceil(DUMMY_DATA.length / coursesPerPage)).keys()].map((number, index) => (
                                <li key={index} className="page-item">
                                    <a onClick={() => paginate(number + 1)} href={`#${number + 1}`} className={`page-link ${currentPage === number + 1 ? 'active' : ''}`}>
                                        {number + 1}
                                    </a>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage >= Math.ceil(DUMMY_DATA.length / coursesPerPage) ? 'disabled' : ''}`}>
                                <a className="page-link" href={`#${currentPage + 1}`} onClick={() => paginate(currentPage + 1)} aria-label="Next">
                                    <span aria-hidden="true">»</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </main>
        </section>
    );
};

