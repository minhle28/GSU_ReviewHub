import { db } from "../db.js"
import MySecurity from "./myServerSecurity.js";

export default class Courses {
    static async getTerms(key, inputD, res) {
        try {
            db.execute(`SELECT * FROM terms`, (err, data) => {
                if (err) return res.status(500).json(err);

                const terms = data.map(term => ({
                    id: term.termsID,
                    name: term.type
                }));

                const encryptedData = MySecurity.encryptedData(MySecurity.getUserToken(key), terms);
                return res.status(200).json(encryptedData);
            });
            /*
            let output ={
                termTable : [],
                departmentTable: [],
            }

            //course decsiption insecrt new course
            // insert course
            // course -> c_dectiption foregin key = course ACCT1010

            // read excel -> formation ojject -> .map(item elem => insert ques to sql)

            // C_descript
            // ACCT 10123 descript (2 cot dau, primary key)

            // course
            // CRN ACCT 1023 professs

            // unique select ACCT, number from course group by ACCT

            // data.fliter( where acct = actt)

            // query 1 list term
            db.execute(`SELECT * FROM terms`, (err, data) => {
                if (err) return res.status(500).json(err);

                output.termTable =  data.map(term => ({
                    id: term.termsID,
                    name: term.type
                }));                
            });
            // query 2 list department
            db.execute(`SELECT * FROM department` , (err, data) => {
                if (err) return res.status(500).json(err);

                output.departmentTable = data.map(term => ({
                    id: term.termsID,
                    name: term.type
                }));
                
            });
            const encryptedData = MySecurity.encryptedData(MySecurity.getUserToken(key), output);
                return res.status(200).json(encryptedData);
                */
        }
        catch (error) {
            return res.status(500).json("Failed to get terms. " + error);
        }
        
    }

    static addTerms(inputD, res) {
        try {
            const { terms } = inputD;
            if (!terms) {
                throw new Error("Term name is missing or undefined.");
            }
            const insertQuery = `INSERT INTO terms (type) VALUES (?)`;
            db.execute(insertQuery, [terms], (err, data) => {
                if (err) { 
                    console.error("Error executing SQL query:", err);
                    return res.status(500).json(err);
                }
                return res.status(200).json("Term Added Successfully.");
            });
        }
        catch (error) {
            console.error("Error adding term:", error);
            return res.status(500).json("Failed to add term. " + error);
        }
    }
    
    static deleteTerms(inputD, res) {
        try {
            const { termID } = inputD;
            if (!termID) {
                throw new Error("Term ID is missing or undefined.");
            }
            const deleteQuery = `DELETE FROM terms WHERE termsID = ?`;
            db.execute(deleteQuery, [termID], (err, data) => {
                if (err) { 
                    console.error("Error executing SQL query:", err);
                    return res.status(500).json(err);
                }
                return res.status(200).json("Term Deleted Successfully.");
            });
        }
        catch (error) {
            console.error("Error deleting term:", error);
            return res.status(500).json("Failed to delete term. " + error);
        }
    }

    static async updateTerms(inputData, res) {
        try {
            console.log('Received data:', inputData); // Log received data
            const { termID, name } = inputData;
            if (!termID || !name) {
                throw new Error("Term ID or name is missing or undefined.");
            }
            // Execute SQL query to update the term
            const updateQuery = `UPDATE terms SET type = ? WHERE termsID = ?`;
            db.execute(updateQuery, [name, termID], (err, data) => {
                if (err) { 
                    console.error("Error executing SQL query:", err);
                    return res.status(500).json(err);
                }
                return res.status(200).json("Term updated successfully.");
            });
        }
        catch (error) {
            console.error("Error updating term:", error);
            return res.status(500).json("Failed to update term. " + error);
        }
    }
    

    static getTermsDetail(key, inputD, res) {
        try {
            const termID = inputD.termID;
            if (!termID) {
                return res.status(400).json("Term ID is missing.");
            }
    
            // Fetch term details including the term name
            db.execute(`SELECT terms.*, type AS name FROM terms WHERE termsID = ?`, [termID], (err, data) => {
                if (err) {
                    return res.status(500).json(err);
                }
    
                if (data.length === 0) {
                    return res.status(404).json("Term not found.");
                }
    
                const termData = data[0];
                const encryptedData = MySecurity.encryptedData(MySecurity.getUserToken(key), termData);
                return res.status(200).json(encryptedData);
            });
        } catch (error) {
            console.error("Error getting term detail:", error);
            return res.status(500).json("Failed to get term detail. " + error);
        }
    }
    
}
