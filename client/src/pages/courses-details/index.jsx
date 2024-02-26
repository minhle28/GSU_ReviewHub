import React from 'react'
import './courses-details.css';
import { Link } from 'react-router-dom';


export const CoursesDetails = () => {
    return (
        <div id="courses_details">
            <div className='sub-header-course-detail'>
                <Link to="/courses">
                    <i class="fa-solid fa-arrow-left"></i>
                </Link>
                <button className="action-button">Give a Review</button>
            </div>
            <div className='coursesdetails-container' >
                <div className='container'>
                    <div id="title_container" className='container'>
                        <h2>Course Name</h2>
                        <div className="details">
                            <p>Semester: Spring 2024</p>
                            <br/>
                            <p>Instructor: John Doe</p>
                        </div>
                    </div>

                    <div className='main-review-container'>
                        <div className='student-review'>

                        </div>
                        <div className='course-description'>

                        </div>    
                    </div>
                </div>
            </div>
        </div>
    );
}