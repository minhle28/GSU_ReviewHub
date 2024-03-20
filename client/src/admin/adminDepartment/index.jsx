import React, { useState, useEffect } from 'react';
import Sidebar from '../adminLayout/SideBar';
import Navbar from '../adminLayout/NavBar';
import "./adminDepartment.css";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import ClientAPI from "../../api/clientAPI";

export const AdminDepartment = () => {
    const [department, setDepartment] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const departmentPerPage = 10;
    const indexOfLastDepartment = currentPage * departmentPerPage;
    const indexOfFirstDepartment = indexOfLastDepartment - departmentPerPage;
    const currentDepartment = department.slice(indexOfFirstDepartment, indexOfLastDepartment);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        if (Cookies.get("isAdmin") !== '1')
            navigate("/");
    }, []);

    async function fetchDepartment() {
        try {
            const data = { limit: departmentPerPage, page: currentPage };
            const response = await ClientAPI.post("getDepartment", data);
            setDepartment(response.data);
        } catch (error) {
            console.error("Error fetching Department:", error);
        }
    }

    useEffect(() => {
        fetchDepartment();
    }, [currentPage]);

    const paginate = pageNumber => {
        if (pageNumber < 1 || pageNumber > Math.ceil(department.length / departmentPerPage)) {
            return;
        }
        setCurrentPage(pageNumber);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleAddDepartment = async (event) => {
        event.preventDefault();
        try {
            const name = event.target.elements.department.value;
            const data = { department: name };
            const response = await ClientAPI.post("addDepartment", data);
            console.log('start from herer', response.data);
            await fetchDepartment();
        } catch (error) {
            console.error("Error adding Department:", error);
            console.log("Error details:", error.response.data);
        }
        closeModal();
    };

    const removeDepartment = async (event, departmentID) => {
        event.preventDefault();
        try {
            const data = {
                departmentID: departmentID,
            }
            await ClientAPI.post("deleteDepartment", data);
            alert("Deleted Department Successfully");
            await fetchDepartment();
        } catch (error) {
            console.error("Error deleting department:", error);
            alert("Error deleting department: " + error.message);
        }
    }


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

    return (
        <section id="content" className='adminPage department'>
            <Sidebar />
            <Navbar />
            <main className="content-main-product">
                <div className="head-title">
                    <div className="adminLeft">
                        <h1>Department</h1>
                        <ul class="breadcrumb">
                            <li>
                                <a href="#">Department</a>
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
                            <th>Department</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentDepartment.map((department) => (
                            <tr key={department.id}>
                                <td>{department.id}</td>
                                <td>{department.name}</td>
                                <td class="grid-container">
                                    <a class="edit" role="button" href={`adminUpdateDepartment/${department.id}`}>
                                        Edit
                                    </a>
                                    <form method="post" action="">
                                        <button className="delete" onClick={(e) => removeDepartment(e, department.id)}>
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
                            <h2 style={{ textAlign: 'center', color: 'var(--blue)' }}>Add New Department</h2>
                            <br />
                            <h5>EX: Computer Science, Economics, Marketing, and etc.</h5>
                            <br />
                            <form onSubmit={handleAddDepartment} encType="multipart/form-data">
                                <label htmlFor="department">Department:</label>
                                <input required type="text" id="department" name="department" /><br />

                                <button id="close-btn" type="button" onClick={closeModal}>
                                    Close
                                </button>
                                <button type="submit" name="addProduct">
                                    Add New
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
                            {[...Array(Math.ceil(department.length / departmentPerPage)).keys()].map((number, index) => (
                                <li key={index} className="page-item">
                                    <a onClick={() => paginate(number + 1)} href={`#${number + 1}`} className={`page-link ${currentPage === number + 1 ? 'active' : ''}`}>
                                        {number + 1}
                                    </a>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage >= Math.ceil(department.length / departmentPerPage) ? 'disabled' : ''}`}>
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
