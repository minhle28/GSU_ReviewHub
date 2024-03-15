import React, { useState } from 'react';
import './courses.css';
import { Search } from "../../component/search/";
import { Link } from 'react-router-dom';
import { coursesData } from '../dummyData/'; 

export const Courses = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const coursesPerPage = 20;
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const filteredCourses = coursesData.filter(course => {
        return (
            course.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.semester.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });
    const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

    const paginate = pageNumber => {
        if (pageNumber < 1 || pageNumber > Math.ceil(filteredCourses.length / coursesPerPage)) {
            return;
        }
        setCurrentPage(pageNumber);
    };

    const handleSearch = event => {
        setCurrentPage(1);
        setSearchTerm(event.target.value);
    };

    return (
        <div id="courses" className="courses-container">
            <Search handleSearch={handleSearch} />
            <div className='all_course_list'>
                <div className='course_list_center'>
                    {currentCourses.map((course, index) => (
                        <Link to={`/courses-details/${course.courseId}`} style={{ textDecoration: 'none' }} key={index}>
                            <div className="card">
                                <div className="card-header">
                                    {course.courseCode} / {course.instructor} / {course.semester}
                                </div>
                                <div className="card-body">
                                    <blockquote className="blockquote mb-0">
                                        <p>Description: {course.description}</p>
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
                        {[...Array(Math.ceil(filteredCourses.length / coursesPerPage)).keys()].map((number, index) => (
                            <li key={index} className="page-item">
                                <a onClick={() => paginate(number + 1)} href={`#${number + 1}`} className={`page-link ${currentPage === number + 1 ? 'active' : ''}`}>
                                    {number + 1}
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
