import React from 'react';
import './courses.css';
import { Search } from "../../component/search/";
import { Link } from 'react-router-dom';
import { coursesData } from '../dummyData/'; 


export const Courses = () => {
    return (
        <div id="courses" className="courses-container">
            <Search />
            <div className='all_course_list'>
                <div className='course_list_center'>
                    {coursesData.map((course, index) => (
                        <Link to={`/courses-details/${course.id}`} style={{ textDecoration: 'none' }} key={index}>
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
