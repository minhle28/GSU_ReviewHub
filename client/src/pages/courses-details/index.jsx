import React, { useState } from 'react';
import './courses-details.css';
import { Link, useParams } from 'react-router-dom';
import { coursesData, comments } from '../dummyData/';
import { CommentModal } from '../../layouts/CommentModal/';

export const CoursesDetails = () => {
    const { coursesId } = useParams(); // Get the courseId from URL params
    const course = coursesData.find(course => course.courseId == coursesId); // Find the course by courseId

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div id="courses_details">
            <div className='sub-header-course-detail'>
                <Link to="/courses">
                    <i className="fa-solid fa-arrow-left"></i>
                </Link>
                <button className="action-button" onClick={toggleModal}>Give a Review</button>
            </div>
            <div className='coursesdetails-container'>
                <div className='container'>
                    <div id="title_container" className='container'>
                        <h2>{course.courseCode}</h2>
                        <div className="details">
                            <p>Semester: {course.semester}</p>
                            <br />
                            <p>Instructor: {course.instructor}</p>
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
                                                    <div className="d-flex flex-row top-user-info">
                                                        <div className='d-flex flex-row user-info'>
                                                            <img className="rounded-circle" src="/user_icon.png" alt='avatar' width="38px" height="38px" />
                                                            <div className="d-flex flex-column justify-content-start ml-2">
                                                                <span className="d-block font-weight-bold name">{comment.name}</span>
                                                                <span className="date text-black-50">{comment.date}</span>
                                                            </div>
                                                        </div>
                                                        <div className='action-button'>
                                                            <Link to={`/edit-comment/${comment.id}`}>
                                                                <img className="edit-icon-button" src="/edit_icon.png" alt='edit' width="20" />
                                                            </Link>
                                                            <form method="post" action="">
                                                                <button type="submit" name="deleteProduct" value={comment.id} className="delete-icon-button">
                                                                    <img src="/delete_icon.png" alt='delete' width="20" />
                                                                </button>
                                                            </form>
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
            <br /><br />
            <CommentModal isOpen={isModalOpen} onClose={toggleModal} />
        </div>
    );
}
