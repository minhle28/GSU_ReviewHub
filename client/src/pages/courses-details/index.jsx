import React, { useState, useEffect } from 'react';
import './courses-details.css';
import { Link, useParams } from 'react-router-dom';
import { CommentModal } from '../../layouts/CommentModal/';
import ClientAPI from "../../api/clientAPI";
import Cookies from 'js-cookie';

export const CoursesDetails = () => {
    const { coursesId } = useParams(); // Get the courseId from URL params
    const [course, setCourse] = useState(null); // State to hold the course details
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    async function fetchComments() {
        try {
            const response = await ClientAPI.post("getComments", { coursesID: coursesId });
            if (response && response.data) {
                // Filter comments based on the coursesID
                const filteredComments = response.data.filter(comment => comment.coursesID === parseInt(coursesId));
                // Update state with the filtered comments
                setComments(filteredComments);
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    }

    // Fetch courses from the backend
    async function fetchCourses() {
        try {
            const response = await ClientAPI.post("getCourses", {});
            if (response && response.data) {
                // Find the course by courseId
                const foundCourse = response.data.find(course => course.id === parseInt(coursesId));
                setCourse(foundCourse);
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    }

    useEffect(() => {
        fetchCourses();
        fetchComments();
    }, [coursesId]);

    // Render loading state while fetching course details
    if (!course || !comments) {
        return <div>Loading...</div>;
    }

    const removeReview = async (event, reviewID) => {
        event.preventDefault();
        try {
            const data = {
                reviewID: reviewID,
            }
            await ClientAPI.post("deleteComments", data);
            alert("Deleted Successfully");
            // Update comments state after deletion
            const updatedComments = comments.filter(comment => comment.id !== reviewID);
            setComments(updatedComments);
        } catch (error) {
            console.error("Error deleting review:", error);
            alert("Error deleting review: " + error.message);
        }
    }

    const handleAddReview = async (comment) => {
        try {
            const formattedDate = new Date().toISOString().slice(0, 19).replace('T', ' '); // Format the date
            const response = await ClientAPI.post("addComments", {
                coursesID: coursesId,
                userID: Cookies.get("userID"),
                comment: comment,
                reviewDate: formattedDate // Use the formatted date
            });
            console.log(response.data);
            // Clear the form after submission
            setComment('');
            // Close the modal after posting the comment
            setIsModalOpen(false);
            fetchComments();
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };


    return (
        <div id="courses_details">
            <div className='sub-header-course-detail'>
                <Link to="/courses">
                    <i className="fa-solid fa-arrow-left"></i>
                </Link>
                {Cookies.get("userID") && (
                    <button className="action-button" onClick={toggleModal}>Give a Review</button>
                )}
            </div>
            <div className='coursesdetails-container'>
                <div className='container'>
                    <div id="title_container" className='container'>
                        <h2>{course.prefix} {course.number}</h2>
                        <div className="details">
                            <p><b>Semester:</b> {course.term}</p>
                            <br />
                            <p><b>Professor:</b> {course.professor}</p>
                        </div>
                    </div>
                    <br /><br />
                    <div className='main-review-container'>
                        <div className='student-review'>
                            <h4>Student Reviews:</h4>
                            {comments.length === 0 ? (
                                <div className='no-review'>
                                    <h4>No Reviews Yet.</h4>
                                </div>
                            ) : (
                                comments.map((comment, index) => (
                                    <div key={index} className="container mt-4">
                                        <div className="d-flex row">
                                            <div className="col-md-12">
                                                <div className="d-flex flex-column comment-section">
                                                    <div className="bg-white p-4">
                                                        <div className="d-flex flex-row top-user-info">
                                                            <div className='d-flex flex-row user-info'>
                                                                <img className="rounded-circle" src="/user_icon.png" alt='avatar' width="38px" height="38px" />
                                                                <div className="d-flex flex-column justify-content-start ml-2">
                                                                    <span className={`d-block font-weight-bold ${Cookies.get("userID") == comment.userID ? 'colorUserNameGreen' : 'colorUserNameBlue'}`}>{comment.userFullName}</span>
                                                                    <span className="date text-black-50">Created: {new Date(comment.reviewDate).toLocaleString()}</span>
                                                                </div>
                                                            </div>
                                                            {Cookies.get("userID") == comment.userID && (
                                                                <div className='action-button'>
                                                                    <Link to={`/edit-comment/${comment.id}?coursesId=${coursesId}&userId=${comment.userID}`}>
                                                                        <img className="edit-icon-button" src="/edit_icon.png" alt='edit' width="20" />
                                                                    </Link>
                                                                    <form method="post" action="">
                                                                        <button className="delete-icon-button" onClick={(e) => removeReview(e, comment.id)}>
                                                                            <img src="/delete_icon.png" alt='delete' width="20" />
                                                                        </button>
                                                                    </form>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="mt-3">
                                                            <p className="comment-text">{comment.comment}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className='course-description'>
                            <p><b>CRN:</b> {course.crn}</p><br />
                            <p><b>Description:</b> </p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                    </div>
                </div>
            </div>
            <br /><br />
            <CommentModal isOpen={isModalOpen} onClose={toggleModal} handleAddReview={handleAddReview} />
        </div>
    );
};
