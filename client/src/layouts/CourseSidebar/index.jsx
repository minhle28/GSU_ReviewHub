import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./course_sidebar.css";
import { Courses } from "../../pages/courses/";
import { CoursesDetails } from "../../pages/courses-details/";

export const CourseSidebar = () => {
    const [selectedTerm, setSelectedTerm] = useState("All");
    const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
    const [selectedPrefix, setSelectedPrefix] = useState("All");
    const [selectedCourseNumber, setSelectedCourseNumber] = useState("All");

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here
        // You can access selectedTerm, selectedDepartment, selectedPrefix, selectedCourseNumber here
    };

    const handleReset = () => {
        setSelectedTerm("All");
        setSelectedDepartment("All Departments");
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
                                <p>Select Term:</p>
                                <select
                                    className="form-select form-select-sm"
                                    aria-label=".form-select-sm example"
                                    value={selectedTerm}
                                    onChange={(e) => setSelectedTerm(e.target.value)}
                                >
                                    <option value="All">All</option>
                                    <option value="FA2023">FA 2023</option>
                                </select>
                            </li>
                            <li>
                                <p>Select Department:</p>
                                <select
                                    className="form-select form-select-sm"
                                    aria-label=".form-select-sm example"
                                    value={selectedDepartment}
                                    onChange={(e) => setSelectedDepartment(e.target.value)}
                                >
                                    <option value="All Departments">All Departments</option>
                                    <option value="Computer Science">Computer Science</option>
                                </select>
                            </li>
                            <li>
                                <p>Select Prefix:</p>
                                <select
                                    className="form-select form-select-sm"
                                    aria-label=".form-select-sm example"
                                    value={selectedPrefix}
                                    onChange={(e) => setSelectedPrefix(e.target.value)}
                                >
                                    <option value="All">All</option>
                                    <option value="CSC">CSC</option>
                                </select>
                            </li>
                            <li>
                                <p>Select Course Number:</p>
                                <select
                                    className="form-select form-select-sm"
                                    aria-label=".form-select-sm example"
                                    value={selectedCourseNumber}
                                    onChange={(e) => setSelectedCourseNumber(e.target.value)}
                                >
                                    <option value="All">All</option>
                                    <option value="4350">4350</option>
                                    <option value="4311">4311</option>
                                    <option value="1301">1301</option>
                                </select>
                            </li>
                        </ul>
                        <div className="form-buttons">
                            <button type="submit" className="submit-button">Run</button>
                            <button type="reset" className="reset-button">Reset</button>
                        </div>
                    </form>
                </div>
            </div>
            <Courses>
                <CoursesDetails />
            </Courses>
        </div>
    );
};
