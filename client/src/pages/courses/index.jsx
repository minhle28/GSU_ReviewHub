import React from 'react';
import './courses.css';
import { Search } from "../../component/search/";
import { Link } from 'react-router-dom';

export const Courses = () => {
    // Sample course data
    const coursesData = [
        { header: 'Course 1 / Prof. / Semester', quote: 'Quote 1' },
        { header: 'Course 2 / Prof. / Semester', quote: 'Quote 2' },
        { header: 'Course 3 / Prof. / Semester', quote: 'Quote 3' },
        { header: 'Course 4 / Prof. / Semester', quote: 'Quote 4' },
        { header: 'Course 5 / Prof. / Semester', quote: 'Quote 5' },
        { header: 'Course 6 / Prof. / Semester', quote: 'Quote 6' },
        { header: 'Course 7 / Prof. / Semester', quote: 'Quote 7' },
        { header: 'Course 8 / Prof. / Semester', quote: 'Quote 8' },
        { header: 'Course 9 / Prof. / Semester', quote: 'Quote 9' },
        { header: 'Course 10 / Prof. / Semester', quote: 'Quote 10' },
        { header: 'Course 11 / Prof. / Semester', quote: 'Quote 11' },
        { header: 'Course 12 / Prof. / Semester', quote: 'Quote 12' },
    ];

    return (
        <div id="courses" className="courses-container">
            <Search />
            <div className='all_course_list'>
                {coursesData.map((course, index) => (
                    <div className="card" key={index}>
                        <div className="card-header">
                            {course.header}
                        </div>
                        <div className="card-body">
                            <blockquote className="blockquote mb-0">
                                <p>{course.quote}</p>
                            </blockquote>
                        </div>
                    </div>
                ))}
            </div>

            <div className='page-number'>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item">
                            <a className="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">«</span>
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">
                                1
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">
                                2
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">
                                3
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">»</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};
