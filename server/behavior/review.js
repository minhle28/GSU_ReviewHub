import { db } from "../db.js"
import MySecurity from "./myServerSecurity.js";

export default class review {

    static async getComments(key, inputD, res) {
        try {
            db.execute(`SELECT review.*, user.fullName AS userFullName FROM review JOIN user ON review.userID = user.userID`, (err, data) => {
                if (err) return res.status(500).json(err);
    
                const review = data.map(review => ({
                    id: review.reviewID,
                    coursesID: review.coursesID,
                    userID: review.userID,
                    userFullName: review.userFullName, 
                    comment: review.comment,
                    reviewDate: review.reviewDate
                }));
    
                const encryptedData = MySecurity.encryptedData(MySecurity.getUserToken(key), review);
                return res.status(200).json(encryptedData);
            });
        }
        catch (error) {
            return res.status(500).json("Failed to get comment. " + error);
        }
    }
    
    static deleteComments(inputD, res) {
        try {
            const { reviewID } = inputD;
            if (!reviewID) {
                throw new Error("Review ID is missing or undefined.");
            }
            const deleteQuery = `DELETE FROM review WHERE reviewID = ?`;
            db.execute(deleteQuery, [reviewID], (err, data) => {
                if (err) {
                    console.error("Error executing SQL query:", err);
                    return res.status(500).json(err);
                }
                return res.status(200).json("Review Deleted Successfully.");
            });
        }
        catch (error) {
            console.error("Error deleting review:", error);
            return res.status(500).json("Failed to delete review. " + error);
        }
    }

    static async addComments(inputData, res) {
        try {
            // Extract data from the request body
            const { coursesID, userID, comment, reviewDate } = inputData;
            
            // Validate input data
            if (!coursesID || !userID || !comment || !reviewDate) {
                throw new Error("Missing required fields.");
            }

            // Construct the SQL query to insert the comment into the database
            const insertQuery = `INSERT INTO review (coursesID, userID, comment, reviewDate) VALUES (?, ?, ?, ?)`;
            
            // Execute the SQL query
            db.execute(insertQuery, [coursesID, userID, comment, reviewDate], (err, data) => {
                if (err) {
                    console.error("Error executing SQL query:", err);
                    return res.status(500).json(err);
                }
                return res.status(200).json("Comment added successfully.");
            });
        } catch (error) {
            console.error("Error adding comment:", error);
            return res.status(500).json("Failed to add comment. " + error);
        }
    }
}