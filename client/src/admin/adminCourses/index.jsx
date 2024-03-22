import React, { useState, useEffect } from 'react';
import Sidebar from '../adminLayout/SideBar';
import Navbar from '../adminLayout/NavBar';
import "./adminCourses.css";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import ClientAPI from "../../api/clientAPI";

export const AdminCourses = () => {
    const [courses, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 10;
    const indexOfLastCourses = currentPage * coursesPerPage;
    const indexOfFirstCourses = indexOfLastCourses - coursesPerPage;
    const currentCourses = courses.slice(indexOfFirstCourses, indexOfLastCourses);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [terms, setTerms] = useState([]);
    const [departments, setDepartments] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        if (Cookies.get("isAdmin") !== '1')
            navigate("/");
    }, []);

    async function fetchCourses() {
        try {
            const data = { limit: coursesPerPage, page: currentPage };
            const response = await ClientAPI.post("getCourses", data);
            setCourses(response.data);
        } catch (error) {
            console.error("Error fetching Courses:", error);
        }
    }

    async function fetchTermsAndDepartments() {
        try {
            const response1 = await ClientAPI.post("getTerms");
            setTerms(response1.data);

            const response2 = await ClientAPI.post("getDepartment");
            setDepartments(response2.data);
        } catch (error) {
            console.error("Error fetching Terms and Departments:", error);
        }
    }

    useEffect(() => {
        fetchCourses();
        fetchTermsAndDepartments();
    }, [currentPage]);

    const paginate = pageNumber => {
        if (pageNumber < 1 || pageNumber > Math.ceil(courses.length / coursesPerPage)) {
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

    const handleAddCourses = async (event) => {
        event.preventDefault();
        try {
            const file = event.target.elements.excelFile.files[0]; // Get the uploaded file
            const terms = event.target.elements.terms.value; // Get the selected term
            const departments = event.target.elements.departments.value; // Get the selected department
    
            // Create an object to send to the server
            const data = {
                terms: terms,
                departments: departments,
                excelFile: file
            };
            
            console.log('terms', terms);
            console.log('departments', departments);
            console.log('excelFile', file);
    
            console.log("Data sent to server:", data); 
            
            // Send the data to the server using ClientAPI
            const response = await ClientAPI.post("addCourses", data);
            console.log("Response from server:", response); 
            
            // If the response is successful, fetch updated courses
            if (response && response.data) {
                await fetchCourses();
            } else {
                console.error("Invalid response from server:", response);
            }
        } catch (error) {
            console.error("Error adding Courses:", error);
            console.log("Error details:", error.response?.data);
        }
        closeModal();
    };
      

    const removeCourses = async (event, coursesID) => {
        event.preventDefault();
        try {
            const data = {
                coursesID: coursesID,
            }
            await ClientAPI.post("deleteCourses", data);
            alert("Deleted Courses Successfully");
            await fetchCourses();
        } catch (error) {
            console.error("Error deleting Courses:", error);
            alert("Error deleting Courses: " + error.message);
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
                            <th>Course Prefix</th>
                            <th>Course Number</th>
                            <th>Professor</th>
                            <th>Terms</th>
                            <th>Departments</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentCourses.map((courses) => (
                            <tr key={courses.id}>
                                <td>{courses.id}</td>
                                <td>{courses.crn}</td>
                                <td>{courses.prefix}</td>
                                <td>{courses.number}</td>
                                <td>{courses.professor}</td>
                                <td>{courses.term}</td>
                                <td>{courses.department}</td>
                                <td>
                                    <a class="edit" role="button" href={`adminUpdateCourses/${courses.id}`}>
                                        Edit
                                    </a>
                                    <form method="post" action="">
                                        <button class="delete" onClick={(e) => removeCourses(e, courses.id)}>
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
                            <form onSubmit={handleAddCourses} encType="multipart/form-data">
                                <label htmlFor="terms">Select Terms:</label>
                                <select id="terms" name="terms">
                                    {terms.map((term) => (
                                        <option key={term.id} value={term.id}>{term.name}</option>
                                    ))}
                                </select><br />
                                <label htmlFor="departments">Select Departments:</label>
                                <select id="departments" name="departments">
                                    {departments.map((department) => (
                                        <option key={department.id} value={department.id}>{department.name}</option>
                                    ))}
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
                            {[...Array(Math.ceil(courses.length / coursesPerPage)).keys()].map((number, index) => (
                                <li key={index} className="page-item">
                                    <a onClick={() => paginate(number + 1)} href={`#${number + 1}`} className={`page-link ${currentPage === number + 1 ? 'active' : ''}`}>
                                        {number + 1}
                                    </a>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage >= Math.ceil(courses.length / coursesPerPage) ? 'disabled' : ''}`}>
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

