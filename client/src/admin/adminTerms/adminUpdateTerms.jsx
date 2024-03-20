import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../adminLayout/SideBar';
import Navbar from '../adminLayout/NavBar';
import "./adminTerms.css";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import ClientAPI from "../../api/clientAPI";
import MySecurity from "../../api/mySecurity";

export const AdminUpdateTerms = () => {
    const { termID } = useParams();
    const [termName, setTermName] = useState('');
    const navigate = useNavigate();
    const [termData, setTermData] = useState(null);
    const [inputValues, setInputValues] = useState({});

    useEffect(() => {
        if (Cookies.get("isAdmin") !== '1')
            navigate("/");

    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleCancelEdit = (event) => {
        event.preventDefault();
        navigate("/adminTerms");
    };

    // update product
    const handleEditTerm = async (event) => {
        event.preventDefault();
        // Submit change
        try {
            let data = {
                ...inputValues,
            }
            const respond = await ClientAPI.post("updateTerms", data);
            if (respond.data !== null && respond.data !== undefined) {
                //alert("Edited: ")
                navigate("/adminTerms")
            }
        }
        catch (err) {
            alert("Can not Edit", err)
        }
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const data = {
                    termID: termID,
                };
                // get information
                const respond = await ClientAPI.post("getTermsDetail", data);
                let termData = MySecurity.decryptedData(respond.data);
                setInputValues({
                    termID: termID,
                    name: termData.name,
                });
            }
            catch (err) {
                alert("Can not Fetch", err)
            }
        }
        fetchData();
    }, []);


    return (
        <section id="content" className='adminPage'>
            <Sidebar />
            <Navbar />
            <main>
                <div className="head-title">
                    <div className="adminLeft">
                        <h1>Edit Term</h1>
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
                    <form onSubmit={handleEditTerm} encType="multipart/form-data">
                        <label htmlFor="name">Term Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={inputValues.name}
                            onChange={handleInputChange}
                            required
                        /><br />

                        <button
                            type="button"
                            name="cancelEditTerm"
                            onClick={handleCancelEdit}
                            style={{ marginRight: '10px' }}
                        >
                            Cancel
                        </button>
                        <button type="submit" name="editTerm">Edit Term</button>
                    </form>
                </div>
            </main>
        </section>
    );
};
