import React from 'react';
import './courses-details.css';
import { Link } from 'react-router-dom';
import { coursesData, comments } from '../dummyData/'; 

export const CoursesDetails = () => {

    const course = coursesData[0];

    return (
        <div id="courses_details">
            <div className='sub-header-course-detail'>
                <Link to="/courses">
                    <i className="fa-solid fa-arrow-left"></i>
                </Link>
                <button className="action-button">Give a Review</button>
            </div>
            <div className='coursesdetails-container'>
                <div className='container'>
                    <div id="title_container" className='container'>
                        <h2>Course Name</h2>
                        <div className="details">
                            <p>Semester: Spring 2024</p>
                            <br />
                            <p>Instructor: John Doe</p>
                        </div>
                    </div>
                    <br /><br />
                    <div className='main-review-container'>
                        <div className='student-review'>
                            <h4>Student Reviews:</h4>
                            {/* Loop over comments and render each one */}
                            {comments.map((comment, index) => (
                                <div key={index} className="container mt-4">
                                    <div className="d-flex row">
                                        <div className="col-md-12">
                                            <div className="d-flex flex-column comment-section">
                                                <div className="bg-white p-4">
                                                    <div className="d-flex flex-row user-info">
                                                        <img className="rounded-circle" src="https://i.imgur.com/RpzrMR2.jpg" alt='avatar' width="40" />
                                                        <div className="d-flex flex-column justify-content-start ml-2">
                                                            <span className="d-block font-weight-bold name">{comment.name}</span>
                                                            <span className="date text-black-50">{comment.date}</span>
                                                        </div>
                                                    </div>
                                                    <div className="mt-3">
                                                        <p className="comment-text">{comment.comment}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='course-description'>
                            <h6>Course Description:</h6>
                            <p>{course.description}</p>
                        </div>
                    </div>
                </div>
            </div>
            <br/><br/>
        </div>
    );
}
