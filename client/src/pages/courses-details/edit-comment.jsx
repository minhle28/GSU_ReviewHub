import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './courses-details.css';

export const EditComment = () => {
    const { coursesId } = useParams(); // Get the courseId from URL params
    const navigate = useNavigate();

    const handleCancelEdit = (event) => {
        event.preventDefault();
        navigate(`/courses-details/${coursesId}`);
    };

    const handleEditProduct = (event) => {
        event.preventDefault();
        // Add logic to edit the product
        // ...
    };

    return (
        <div className='updateComment'>
            <div className='sub-header-course-detail'>
                <Link to={`/courses-details/${coursesId}`}>
                    <i className="fa-solid fa-arrow-left"></i>
                </Link>
                <h5>Edit Your Review</h5>
            </div>
            <div className="edit-comment-section">
                <form onSubmit={handleEditProduct} encType="multipart/form-data">
                    <h5>Edit Your Review</h5>
                    <br />
                    <textarea placeholder="Write your comment here..." />

                    <button type="button" name="cancelEditProduct" onClick={handleCancelEdit} style={{ marginRight: '10px' }} >Cancel</button>
                    <button type="submit" name="editProduct">Edit Item</button>
                </form>
            </div>
        </div>
    );
};

