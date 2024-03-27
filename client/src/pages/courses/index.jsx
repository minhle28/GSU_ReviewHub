import React, { useState, useEffect } from 'react';
import './courses.css';
import { Search } from "../../component/search/";
import { Link } from 'react-router-dom';
import ClientAPI from "../../api/clientAPI";
import Cookies from 'js-cookie';

export const Courses = ({ onFilter, filtedData }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [courses, setCourses] = useState([]);
    //const [visiblePages, setVisiblePages] = useState([]);
    // setting next button


    useEffect(() => {
        // Fetch courses from the backend
        async function fetchCourses() {
            try {
                const response = await ClientAPI.post("getCourses", {});
                if (response && response.data) {
                    // Update state with the fetched courses
                    setCourses(response.data);
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        }
        if (filtedData && onFilter === 1) {
            console.log("FrontL:", filtedData)
            setCourses(filtedData)
        } else {
            console.log("FrontL fetch")
            fetchCourses();
        }
        setCurrentPage(1);
    }, [filtedData]);
    let coursesPerPage = 30;


    // Function to calculate the range of visible page numbers
    const calculateVisiblePages = (currentPage, totalPages) => {
        const range = 2; // Number of pages to show before and after the current page
        let start = Math.max(1, currentPage - range);
        let end = Math.min(totalPages, currentPage + range);

        // Adjust the range if the current page is near the start or end
        if (currentPage - range <= 1) {
            end = Math.min(totalPages, 1 + 2 * range);
        }
        if (currentPage + range >= totalPages) {
            start = Math.max(1, totalPages - 2 * range);
        }
        let result = Array.from({ length: end - start + 1 }, (_, i) => start + i);
        return result.length === 0 ? [1] : result;
    };

    let searchingCourses = courses.filter(course => {
        const searchTermWithoutSpaces = searchTerm.toLowerCase().replace(/\s/g, '');
        const courseNumberLowerCase = String(course.number).toLowerCase();
        const prefixLowerCase = course.prefix.toLowerCase().replace(/\s/g, '');
        const courseIdentifier = `${prefixLowerCase}${courseNumberLowerCase}`;

        const courseIdentifierMatches = courseIdentifier.includes(searchTermWithoutSpaces);
        const courseNumberMatches = courseNumberLowerCase.includes(searchTermWithoutSpaces);
        const prefixMatches = prefixLowerCase.includes(searchTermWithoutSpaces);
        const professorMatches = course.professor.toLowerCase().includes(searchTermWithoutSpaces);
        const termMatches = course.term.toLowerCase().includes(searchTermWithoutSpaces);
        const crnMatches = String(course.crn).includes(searchTermWithoutSpaces);
        return courseIdentifierMatches || courseNumberMatches || prefixMatches || professorMatches || termMatches || crnMatches;
    });
    let indexOfLastCourse = currentPage * coursesPerPage;
    let indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    let showingCourses = searchingCourses.slice(indexOfFirstCourse, indexOfLastCourse);
    let totalPages = Math.ceil(searchingCourses.length / coursesPerPage);
    let visiblePages = calculateVisiblePages(currentPage, totalPages);

    //setVisiblePages(calculateVisiblePages(currentPage, totalPages)); 

    // Update visible pages whenever currentPage or filteredCourses change
    useEffect(() => {
        totalPages = Math.ceil(searchingCourses.length / coursesPerPage);
        visiblePages = calculateVisiblePages(currentPage, totalPages);
    }, [currentPage]);

    const handleSearch = event => {
        setCurrentPage(1);
        setSearchTerm(event.target.value);
    };

    const paginate = pageNumber => {
        const totalPages = Math.ceil(searchingCourses.length / coursesPerPage);
        if (pageNumber < 1 || pageNumber > totalPages) {
            setCurrentPage(1);
            console.log("page bumber:" + pageNumber);
            return;
        }
        setCurrentPage(pageNumber);
    };



    return (
        <div id="courses" className="courses-container">
            <Search handleSearch={handleSearch} />
            <div className='all_course_list'>
                <div className='course_list_center'>
                    {showingCourses.length > 0 ? (
                        showingCourses.map((course, index) => (
                            <Link to={`/courses-details/${course.id}`} style={{ textDecoration: 'none' }} key={index}>
                                <div className="card">
                                    <div className="card-header">
                                        <b>
                                            {course.prefix} {course.number} / {course.professor} / {course.term}
                                        </b>
                                    </div>
                                    <div className="card-body">
                                        <blockquote className="blockquote mb-0">
                                            <p><b>CRN:</b> {course.crn}</p>
                                            <p><b>Description:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                        </blockquote>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div>No courses found.</div>
                    )}
                </div>
            </div>

            <div className='page-number'>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className={`page-item ${currentPage <= 1 ? 'disabled' : ''}`}>
                            <a className="page-link" onClick={() => paginate(currentPage - 1)} aria-label="Previous">
                                <span aria-hidden="true">«</span>
                            </a>
                        </li>
                        {visiblePages.map((number) => (
                            <li key={number} className="page-item">
                                <a onClick={() => paginate(number)} className={`page-link ${currentPage === number ? 'active' : ''}`}>
                                    {number}
                                </a>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage >= totalPages ? 'disabled' : ''}`}>
                            <a className="page-link" onClick={() => paginate(currentPage + 1)} aria-label="Next">
                                <span aria-hidden="true">»</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};
