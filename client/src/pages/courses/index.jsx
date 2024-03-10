import React, { useState } from 'react';
import './courses.css';
import { Search } from "../../component/search/";
import { Link } from 'react-router-dom';
import { coursesData } from '../dummyData/'; 

export const Courses = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 20;
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = coursesData.slice(indexOfFirstCourse, indexOfLastCourse);

    const paginate = pageNumber => {
        if (pageNumber < 1 || pageNumber > Math.ceil(coursesData.length / coursesPerPage)) {
            return;
        }
        setCurrentPage(pageNumber);
    };

    return (
        <div id="courses" className="courses-container">
            <Search />
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
                        {[...Array(Math.ceil(coursesData.length / coursesPerPage)).keys()].map((number, index) => (
                            <li key={index} className="page-item">
                                <a onClick={() => paginate(number + 1)} href={`#${number + 1}`} className={`page-link ${currentPage === number + 1 ? 'active' : ''}`}>
                                    {number + 1}
                                </a>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage >= Math.ceil(coursesData.length / coursesPerPage) ? 'disabled' : ''}`}>
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
