import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import "./course_sidebar.css";
import { Courses } from "../../pages/courses/";
import { CoursesDetails } from "../../pages/courses-details/";
import ClientAPI from "../../api/clientAPI";
import Cookies from "js-cookie";

export const CourseSidebar = () => {
    const [selectedTerm, setSelectedTerm] = useState({ id: "All", name: "All" });
    const [selectedDepartment, setSelectedDepartment] = useState({ id: "All", name: "All Departments" });
    const [selectedPrefix, setSelectedPrefix] = useState("All");
    const [selectedCourseNumber, setSelectedCourseNumber] = useState("All");

    // State to hold fetched course data
    const [terms, setTerms] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [prefix, setPrefix] = useState([]);
    const [number, setNumber] = useState([]);
    const [filtedData, setFiltedData] = useState([]);
    const [onFilter, setOnFilter] = useState([0]);

    useEffect(() => {
        // Fetch courses data when the component mounts
        fetchTerms();
        fetchDepartments();
        fetchPrefix();
        fetchNumber();
    }, []);

    // Function to fetch data from the server
    const fetchTerms = async () => {
        try {
            const response = await ClientAPI.post("getTerms", {});
            if (response && response.data) {
                setTerms(response.data);
            }
        } catch (error) {
            console.error("Error fetching terms:", error);
        }
    };

    // Function to fetch departments from the server
    const fetchDepartments = async () => {
        try {
            const response = await ClientAPI.post("getDepartment", {});
            if (response && response.data) {
                setDepartments(response.data);
            }
        } catch (error) {
            console.error("Error fetching departments:", error);
        }
    };

    const fetchPrefix = async () => {
        try {
            const response = await ClientAPI.post("getCoursePrefix", {});
            if (response && response.data) {
                setPrefix(response.data);
            }
        } catch (error) {
            console.error("Error fetching prefix:", error);
        }
    };

    const fetchNumber = async () => {
        try {
            const response = await ClientAPI.post("getCourseNumber", {});
            if (response && response.data) {
                setNumber(response.data);
            }
        } catch (error) {
            console.error("Error fetching course number:", error);
        }
    };

    // Frontend (CourseSidebar.js)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const filters = {
            termsID: selectedTerm.id,
            departmentID: selectedDepartment.id,
            coursePrefix: selectedPrefix,
            courseNumber: parseInt(selectedCourseNumber)
        };
        try {
            // Send filter data to backend
            const response = await ClientAPI.post('filterCourses', filters);
            // Call parent component function to update courses state
            setFiltedData(response.data); // Assuming the response contains filtered courses  
            setOnFilter(1);
        } catch (error) {
            console.error('Error filtering courses:', error);
        }
    };

    useEffect(() => { }, [filtedData]);

    const handleReset = () => {
        setSelectedTerm({ id: "All", name: "All" });
        setSelectedDepartment({ id: "All", name: "All Departments" });
        setSelectedPrefix("All");
        setSelectedCourseNumber("All");
    };

    return (
        <div className="menu-courses-container">
            <div className="menu-courses-nav">
                <div className="menu-nav">
                    <h6>Parameters</h6>
                    <hr />
                    <form onSubmit={handleSubmit} onReset={handleReset}>
                        <ul className="menu-courses-list">
                            <li>
                                <label htmlFor="select-term">Select Term:</label>
                                <select
                                    id="select-term"
                                    className="form-select form-select-sm"
                                    aria-label=".form-select-sm example"
                                    value={selectedTerm.name}
                                    onChange={(e) => setSelectedTerm(terms.find(term => term.name === e.target.value))}
                                >
                                    <option value="All">All</option>
                                    {terms.map((term) => (
                                        <option key={term.id} value={term.name}>
                                            {term.name}
                                        </option>
                                    ))}
                                </select>
                            </li>
                            <li>
                                <label htmlFor="select-department">Select Department:</label>
                                <select
                                    id="select-department"
                                    className="form-select form-select-sm"
                                    aria-label=".form-select-sm example"
                                    value={selectedDepartment.name}
                                    onChange={(e) => setSelectedDepartment(departments.find(department => department.name === e.target.value))}
                                >
                                    <option value="All Departments">All Departments</option>
                                    {departments.map((department) => (
                                        <option key={department.id} value={department.name}>
                                            {department.name}
                                        </option>
                                    ))}
                                </select>
                            </li>
                            <li>
                                <label htmlFor="select-prefix">Select Prefix:</label>
                                <select
                                    id="select-prefix"
                                    className="form-select form-select-sm"
                                    aria-label=".form-select-sm example"
                                    value={selectedPrefix}
                                    onChange={(e) => setSelectedPrefix(e.target.value)}
                                >
                                    <option value="All">All</option>
                                    {prefix.map((prefix) => (
                                        <option key={prefix.id} value={prefix.name}>
                                            {prefix.name}
                                        </option>
                                    ))}
                                </select>
                            </li>
                            <li>
                                <label htmlFor="course-number">Select Course Number:</label>
                                <select
                                    id="course-number"
                                    className="form-select form-select-sm"
                                    aria-label=".form-select-sm example"
                                    value={selectedCourseNumber}
                                    onChange={(e) => setSelectedCourseNumber(e.target.value)}
                                >
                                    <option value="All">All</option>
                                    {number.map((number) => (
                                        <option key={number.id} value={number.coursenumber}>
                                            {number.coursenumber}
                                        </option>
                                    ))}
                                </select>
                            </li>
                        </ul>
                        <div className="form-buttons">
                            <button type="submit" className="submit-button">
                                Run
                            </button>
                            <button type="reset" className="reset-button" onClick={() => {
                                window.location.reload();
                            }}>
                                Reset
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Courses onFilter={onFilter} filtedData={filtedData} />

        </div>
    );
};
