import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../adminLayout/SideBar';
import Navbar from '../adminLayout/NavBar';
import "./adminDepartment.css";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import ClientAPI from "../../api/clientAPI";
import MySecurity from "../../api/mySecurity";

export const AdminUpdateDepartment = () => {
    const { departmentID } = useParams();
    //const [departmentName, setDepartmentName] = useState('');
    const navigate = useNavigate();
    //const [departmentData, setDepartmentData] = useState(null);
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
        navigate("/adminDepartment");
    };

    // update product
    const handleEditDepartment = async (event) => {
        event.preventDefault();
        // Submit change
        try {
            let data = {
                ...inputValues,
            }
            const respond = await ClientAPI.post("updateDepartment", data);
            if (respond.data !== null && respond.data !== undefined) {
                //alert("Edited: ")
                navigate("/adminDepartment")
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
                    departmentID: departmentID,
                };
                // get information
                const respond = await ClientAPI.post("getDepartmentDetail", data);
                let departmentData = MySecurity.decryptedData(respond.data);
                setInputValues({
                    departmentID: departmentID,
                    name: departmentData.name,
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
                        <h1>Edit Department</h1>
                        <ul class="breadcrumb">
                            <li>
                                <a href="#">Department</a>
                            </li>
                            <li><i class='bx bx-chevron-right' ></i></li>
                            <li>
                                <a class="active" href="/adminDepartment">Home</a>
                            </li>
                            <li><i class='bx bx-chevron-right' ></i></li>
                            <li>
                                <a class="active" href="#">Edit</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="updateProduct">
                    <form onSubmit={handleEditDepartment} encType="multipart/form-data">
                        <label htmlFor="name">Department Name:</label>
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
                            name="cancelEditDepartment"
                            onClick={handleCancelEdit}
                            style={{ marginRight: '10px' }}
                        >
                            Cancel
                        </button>
                        <button type="submit" name="editDepartment">Edit Department</button>
                    </form>
                </div>
            </main>
        </section>
    );
};
