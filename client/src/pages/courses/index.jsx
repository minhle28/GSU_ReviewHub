import React, { useState, useEffect } from 'react';
import './courses.css';
import { Search } from "../../component/search/";
import { Link } from 'react-router-dom';
import ClientAPI from "../../api/clientAPI";

export const Courses = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [courses, setCourses] = useState([]);
    const [visiblePages, setVisiblePages] = useState([]);

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
        fetchCourses();
    }, []);

    const handleSearch = event => {
        setCurrentPage(1);
        setSearchTerm(event.target.value);
    };

    const filteredCourses = courses.filter(course => {
        return (
            String(course.crn).includes(searchTerm.toLowerCase()) ||
            course.professor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.prefix.toLowerCase().includes(searchTerm.toLowerCase()) ||
            String(course.number).includes(searchTerm.toLowerCase())
        );
    });


    const coursesPerPage = 30;
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

    const paginate = pageNumber => {
        const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
        if (pageNumber < 1 || pageNumber > totalPages) {
            return;
        }
        setCurrentPage(pageNumber);
    };

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

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    // Update visible pages whenever currentPage or filteredCourses change
    useEffect(() => {
        const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
        setVisiblePages(calculateVisiblePages(currentPage, totalPages));
    }, [currentPage, filteredCourses, coursesPerPage]);


    return (
        <div id="courses" className="courses-container">
            <Search handleSearch={handleSearch} />
            <div className='all_course_list'>
                <div className='course_list_center'>
                    {currentCourses.map((course, index) => (
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
                    ))}
                </div>
            </div>

            <div className='page-number'>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className={`page-item ${currentPage <= 1 ? 'disabled' : ''}`}>
                            <a className="page-link" href={`#${currentPage - 1}`} onClick={() => paginate(currentPage - 1)} aria-label="Previous">
                                <span aria-hidden="true">«</span>
                            </a>
                        </li>
                        {visiblePages.map((number) => (
                            <li key={number} className="page-item">
                                <a onClick={() => paginate(number)} href={`#${number}`} className={`page-link ${currentPage === number ? 'active' : ''}`}>
                                    {number}
                                </a>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage >= Math.ceil(filteredCourses.length / coursesPerPage) ? 'disabled' : ''}`}>
                            <a className="page-link" href={`#${currentPage + 1}`} onClick={() => paginate(currentPage + 1)} aria-label="Next">
                                <span aria-hidden="true">»</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};
