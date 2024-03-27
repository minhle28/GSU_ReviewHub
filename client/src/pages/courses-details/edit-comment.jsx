import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import './courses-details.css';
import Cookies from 'js-cookie';
import ClientAPI from "../../api/clientAPI";
import MySecurity from "../../api/mySecurity";


export const EditComment = () => {
    const { reviewID } = useParams(); // Get the courseId from URL params
    const navigate = useNavigate();
    const [inputValues, setInputValues] = useState({});
    const { search } = useLocation();
    const query = new URLSearchParams(search);

    const coursesId = query.get('coursesId');
    const userId = query.get('userId');

    useEffect(() => {
        if (Cookies.get("userID") !== userId)
            navigate("/courses");
    }, []);

    const handleCancelEdit = (event) => {
        event.preventDefault();
        navigate(`/courses-details/${coursesId}`);
    };

    const handleInputChange = (event) => {
        const { value } = event.target;
        setInputValues((prevValues) => ({
            ...prevValues,
            comment: value,
        }));
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const data = {
                    reviewID: reviewID,
                };
                // get information
                const respond = await ClientAPI.post("getCommentsDetail", data);
                let reviewData = MySecurity.decryptedData(respond.data);
                setInputValues({
                    reviewID: reviewID,
                    comment: reviewData.comment,
                });
            }
            catch (err) {
                alert("Can not Fetch", err)
            }
        }
        fetchData();
    }, []);

    const handleEditComment = async (event) => {
        event.preventDefault();
        // Submit change
        try {
            let data = {
                ...inputValues,
            }
            const respond = await ClientAPI.post("updateComments", data);
            if (respond.data !== null && respond.data !== undefined) {
                //alert("Edited: ")
                navigate(`/courses-details/${coursesId}`);
            }
        }
        catch (err) {
            alert("Can not Edit", err)
        }
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
                <form onSubmit={handleEditComment} encType="multipart/form-data">
                    <h5>Edit Your Review</h5>
                    <br />
                    <textarea
                        placeholder="Write your comment here..."
                        value={inputValues.comment}
                        onChange={handleInputChange}
                    />
                    <button type="button" name="cancelEditProduct" onClick={handleCancelEdit} style={{ marginRight: '10px' }} >Cancel</button>
                    <button type="submit" name="editProduct">Edit Item</button>
                </form>
            </div>
        </div>
    );
};

