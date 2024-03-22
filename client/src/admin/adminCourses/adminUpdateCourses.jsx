import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../adminLayout/SideBar';
import Navbar from '../adminLayout/NavBar';
import "./adminCourses.css";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import ClientAPI from "../../api/clientAPI";
import MySecurity from "../../api/mySecurity";

export const AdminUpdateCourses = () => {
    const { coursesID } = useParams();
    const navigate = useNavigate();
    const [termsData, setTermsData] = useState([]);
    const [departmentData, setDepartmentData] = useState([]);
    const [inputValues, setInputValues] = useState({});

    useEffect(() => {
        if (Cookies.get("isAdmin") !== '1')
            navigate("/");

        async function fetchData() {
            try {
                const data = { coursesID: coursesID };

                const respond1 = await ClientAPI.post("getTerms", data);
                setTermsData(MySecurity.decryptedData(respond1.data));

                const respond2 = await ClientAPI.post("getDepartment", data);
                setDepartmentData(MySecurity.decryptedData(respond2.data));

                const respond3 = await ClientAPI.post("getCoursesDetail", data);
                const coursesData = MySecurity.decryptedData(respond3.data);
                setInputValues({
                    coursesID: coursesID,
                    termsID: coursesData.termsID,
                    departmentID: coursesData.departmentID,
                });
            }
            catch (err) {
                alert("Can not Fetch", err)
            }
        }
        fetchData();
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
        navigate("/adminCourses");
    };

    const handleEditCourses = async (event) => {
        event.preventDefault();
        try {
            const respond = await ClientAPI.post("updateCourses", inputValues);
            if (respond.data !== null && respond.data !== undefined) {
                navigate("/adminCourses");
            }
        }
        catch (err) {
            alert("Can not Edit", err)
        }
    };

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
                {(termsData.length > 0 && departmentData.length > 0) ? (
                    <div className="updateProduct">
                        <form onSubmit={handleEditCourses} encType="multipart/form-data">
                            <label htmlFor="termsID">Select Terms:</label>
                            <select id="termsID" name="termsID" value={inputValues.termsID} onChange={handleInputChange}>
                                {termsData.map(row => (
                                    <option key={row.id} value={row.id}>{row.name}</option>
                                ))}
                            </select><br />
                            <label htmlFor="departmentID">Select Departments:</label>
                            <select id="departmentID" name="departmentID" value={inputValues.departmentID} onChange={handleInputChange}>
                                {departmentData.map(row => (
                                    <option key={row.id} value={row.id}>{row.name}</option>
                                ))}
                            </select><br />

                            <button type="button" name="cancelEditProduct" onClick={handleCancelEdit} style={{ marginRight: '10px' }}>Cancel</button>
                            <button type="submit" name="editProduct">Edit Item</button>
                        </form>
                    </div>
                ) : (
                    <div className="updateProduct">
                        <p>Loading...</p>
                    </div>
                )}
            </main>
        </section>
    );
};
