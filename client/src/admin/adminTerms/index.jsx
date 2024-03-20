import React, { useState, useEffect } from 'react';
import Sidebar from '../adminLayout/SideBar';
import Navbar from '../adminLayout/NavBar';
import "./adminTerms.css";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import ClientAPI from "../../api/clientAPI";

export const AdminTerms = () => {
    const [terms, setTerms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const termsPerPage = 10;
    const indexOfLastTerm = currentPage * termsPerPage;
    const indexOfFirstTerm = indexOfLastTerm - termsPerPage;
    const currentTerms = terms.slice(indexOfFirstTerm, indexOfLastTerm);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        if (Cookies.get("isAdmin") !== '1')
            navigate("/");
    }, []);

    async function fetchTerms() {
        try {
            const data = { limit: termsPerPage, page: currentPage };
            const response = await ClientAPI.post("getTerms", data);
            setTerms(response.data);
        } catch (error) {
            console.error("Error fetching terms:", error);
        }
    }

    useEffect(() => {
        fetchTerms();
    }, [currentPage]);

    const paginate = pageNumber => {
        if (pageNumber < 1 || pageNumber > Math.ceil(terms.length / termsPerPage)) {
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

    const handleAddTerms = async (event) => {
        event.preventDefault();
        try {
            const name = event.target.elements.terms.value;
            const data = { terms: name }; 
            const response = await ClientAPI.post("addTerms", data);
            console.log('start from herer', response.data);
            await fetchTerms();
        } catch (error) {
            console.error("Error adding term:", error);
            console.log("Error details:", error.response.data);
        }
        closeModal();
    };

    const removeTerm = async (event, termID) => {
        event.preventDefault();
        try {
            const data = {
                termID: termID,
            }
            await ClientAPI.post("deleteTerms", data);
            alert("Deleted Term Successfully");
            await fetchTerms();
        } catch (error) {
            console.error("Error deleting term:", error);
            alert("Error deleting term: " + error.message);
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
        <section id="content" className='adminPage terms'>
            <Sidebar />
            <Navbar />
            <main className="content-main-product">
                <div className="head-title">
                    <div className="adminLeft">
                        <h1>Terms</h1>
                        <ul class="breadcrumb">
                            <li>
                                <a href="#">Terms</a>
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
                            <th>Terms</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentTerms.map((term) => (
                            <tr key={term.id}>
                                <td>{term.id}</td>
                                <td>{term.name}</td>
                                <td class="grid-container">
                                    <a class="edit" role="button" href={`adminUpdateTerms/${term.id}`}>
                                        Edit
                                    </a>
                                    <form method="post" action="">
                                        <button className="delete" onClick={(e) => removeTerm(e, term.id)}>
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
                            <h2 style={{ textAlign: 'center', color: 'var(--blue)' }}>Add New Term</h2>
                            <br />
                            <h5>EX: SP 2024</h5>
                            <br />
                            <form onSubmit={handleAddTerms} encType="multipart/form-data">
                                <label htmlFor="terms">Term:</label>
                                <input required type="text" id="terms" name="terms" /><br />

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
                            {[...Array(Math.ceil(terms.length / termsPerPage)).keys()].map((number, index) => (
                                <li key={index} className="page-item">
                                    <a onClick={() => paginate(number + 1)} href={`#${number + 1}`} className={`page-link ${currentPage === number + 1 ? 'active' : ''}`}>
                                        {number + 1}
                                    </a>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage >= Math.ceil(terms.length / termsPerPage) ? 'disabled' : ''}`}>
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
