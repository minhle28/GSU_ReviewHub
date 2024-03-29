import { db } from "../db.js"
import MySecurity from "./myServerSecurity.js";
import xlsx from 'xlsx';


export default class Courses {
    /*---------------------------TERMS------------------------------ */
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

    /*---------------------------DEPARTMENT------------------------------ */
    static async getDepartment(key, inputD, res) {
        try {
            db.execute(`SELECT * FROM department`, (err, data) => {
                if (err) return res.status(500).json(err);

                const department = data.map(term => ({
                    id: term.departmentID,
                    name: term.type
                }));

                const encryptedData = MySecurity.encryptedData(MySecurity.getUserToken(key), department);
                return res.status(200).json(encryptedData);
            });
        }
        catch (error) {
            return res.status(500).json("Failed to get department. " + error);
        }

    }

    static addDepartment(inputD, res) {
        try {
            const { department } = inputD;
            if (!department) {
                throw new Error("Department name is missing or undefined.");
            }
            const insertQuery = `INSERT INTO department (type) VALUES (?)`;
            db.execute(insertQuery, [department], (err, data) => {
                if (err) {
                    console.error("Error executing SQL query:", err);
                    return res.status(500).json(err);
                }
                return res.status(200).json("Department Added Successfully.");
            });
        }
        catch (error) {
            console.error("Error adding Department:", error);
            return res.status(500).json("Failed to add Department. " + error);
        }
    }

    static deleteDepartment(inputD, res) {
        try {
            const { departmentID } = inputD;
            if (!departmentID) {
                throw new Error("Department ID is missing or undefined.");
            }
            const deleteQuery = `DELETE FROM department WHERE departmentID = ?`;
            db.execute(deleteQuery, [departmentID], (err, data) => {
                if (err) {
                    console.error("Error executing SQL query:", err);
                    return res.status(500).json(err);
                }
                return res.status(200).json("Department Deleted Successfully.");
            });
        }
        catch (error) {
            console.error("Error deleting Department:", error);
            return res.status(500).json("Failed to delete Department. " + error);
        }
    }

    static async updateDepartment(inputData, res) {
        try {
            console.log('Received data:', inputData); // Log received data
            const { departmentID, name } = inputData;
            if (!departmentID || !name) {
                throw new Error("Department ID or name is missing or undefined.");
            }
            // Execute SQL query to update the Department
            const updateQuery = `UPDATE department SET type = ? WHERE departmentID = ?`;
            db.execute(updateQuery, [name, departmentID], (err, data) => {
                if (err) {
                    console.error("Error executing SQL query:", err);
                    return res.status(500).json(err);
                }
                return res.status(200).json("Department updated successfully.");
            });
        }
        catch (error) {
            console.error("Error updating Department:", error);
            return res.status(500).json("Failed to update Department. " + error);
        }
    }


    static getDepartmentDetail(key, inputD, res) {
        try {
            const departmentID = inputD.departmentID;
            if (!departmentID) {
                return res.status(400).json("Department ID is missing.");
            }

            db.execute(`SELECT department.*, type AS name FROM department WHERE departmentID = ?`, [departmentID], (err, data) => {
                if (err) {
                    return res.status(500).json(err);
                }

                if (data.length === 0) {
                    return res.status(404).json("Department not found.");
                }

                const departmentData = data[0];
                const encryptedData = MySecurity.encryptedData(MySecurity.getUserToken(key), departmentData);
                return res.status(200).json(encryptedData);
            });
        } catch (error) {
            console.error("Error getting department detail:", error);
            return res.status(500).json("Failed to get department detail. " + error);
        }
    }

    /*---------------------------COURSES------------------------------ */
    static async getCourses(key, inputD, res) {
        try {
            db.execute(`
                SELECT courses.*, terms.type AS term_type, department.type AS department_type
                FROM courses
                LEFT JOIN terms ON courses.termsID = terms.termsID
                LEFT JOIN department ON courses.departmentID = department.departmentID
                ORDER BY courses.coursesID DESC`, (err, data) => {
                if (err) return res.status(500).json(err);

                const courses = data.map(course => ({
                    id: course.coursesID,
                    crn: course.CRN,
                    prefix: course.coursePrefix,
                    number: course.courseNumber,
                    professor: course.professor,
                    term: course.term_type,
                    department: course.department_type
                }));
                const encryptedData = MySecurity.encryptedData(MySecurity.getUserToken(key), courses);
                return res.status(200).json(encryptedData);
            });
        }
        catch (error) {
            return res.status(500).json("Failed to get courses. " + error);
        }
    }


    xlsx = require('xlsx');
    static async addCourses(inputData, res) {
        try {
            const { terms, departments, excelFile } = inputData;
            console.log('terms', terms);
            console.log('depart', departments);
            console.log('excel ', excelFile);
            // Load the workbook
            const workbook = xlsx.readFile(excelFile.path);

            // Assuming the first sheet is the relevant one
            const sheet = workbook.Sheets[workbook.SheetNames[0]];

            // Array to hold the courses data
            const coursesData = [];

            // Assuming the first row contains headers
            // Adjust row number if necessary
            const startRow = 2;

            // Loop through rows starting from the second row
            for (let i = startRow; sheet[`A${i}`]; i++) {
                if (!sheet[`A${i}`] || !sheet[`B${i}`] || !sheet[`C${i}`]) {
                    continue;
                }
                // Extract data from each row
                const crn = sheet[`A${i}`].v;
                const course = sheet[`B${i}`].v;
                const professor = sheet[`C${i}`].v;

                // Split course into prefix and number
                const [coursePrefix, courseNumber] = course.split(' ');

                // Add the extracted data to the coursesData array
                coursesData.push({
                    crn,
                    coursePrefix,
                    courseNumber,
                    professor,
                    terms,
                    departments
                });
            }

            // Insert the extracted data into the database
            //const insertQuery = `INSERT INTO courses (crn, coursePrefix, courseNumber, professor, terms, departments) VALUES ?`;
            const insertQuery = `INSERT INTO courses (CRN, coursePrefix, courseNumber, professor, termsID, departmentID) VALUES ?`;
            db.query(insertQuery, [coursesData.map(course => [course.crn, course.coursePrefix, course.courseNumber, course.professor, course.terms, course.departments])], (err, data) => {
                if (err) {
                    console.error("Error inserting courses:", err);
                    return res.status(500).json(err);
                }
                return res.status(200).json("Courses added successfully.");
            });
        } catch (error) {
            console.error("Error adding courses:", error);
            return res.status(500).json("Failed to add courses. " + error);
        }
    }



    static deleteCourses(inputD, res) {
        try {
            const { coursesID } = inputD;
            if (!coursesID) {
                throw new Error("Courses ID is missing or undefined.");
            }
            const deleteQuery = `DELETE FROM Courses WHERE coursesID = ?`;
            db.execute(deleteQuery, [coursesID], (err, data) => {
                if (err) {
                    console.error("Error executing SQL query:", err);
                    return res.status(500).json(err);
                }
                return res.status(200).json("Courses Deleted Successfully.");
            });
        }
        catch (error) {
            console.error("Error deleting Courses:", error);
            return res.status(500).json("Failed to delete Courses. " + error);
        }
    }

    static async updateCourses(inputData, res) {
        try {
            console.log('Received data:', inputData);
            const { coursesID, termsID, departmentID } = inputData;
            if (!coursesID || !termsID || !departmentID) {
                throw new Error("Courses ID, termsID, or departmentID is missing or undefined.");
            }
            // Execute SQL query to update the Courses
            const updateQuery = `UPDATE courses SET termsID = ?, departmentID = ? WHERE coursesID = ?`;
            db.execute(updateQuery, [termsID, departmentID, coursesID], (err, data) => {
                if (err) {
                    console.error("Error executing SQL query:", err);
                    return res.status(500).json(err);
                }
                return res.status(200).json("Courses updated successfully.");
            });
        }
        catch (error) {
            console.error("Error updating Courses:", error);
            return res.status(500).json("Failed to update Courses. " + error);
        }
    }


    static getCoursesDetail(key, inputD, res) {
        try {
            const coursesID = inputD.coursesID;
            if (!coursesID) {
                return res.status(400).json("Courses ID is missing.");
            }

            db.execute(`                
                SELECT courses.*, terms.type AS term_type, department.type AS department_type
                FROM courses
                LEFT JOIN terms ON courses.termsID = terms.termsID
                LEFT JOIN department ON courses.departmentID = department.departmentID
                ORDER BY courses.coursesID DESC
            `, [coursesID], (err, data) => {
                if (err) {
                    return res.status(500).json(err);
                }

                if (data.length === 0) {
                    return res.status(404).json("Courses not found.");
                }

                const coursesData = data[0];
                const encryptedData = MySecurity.encryptedData(MySecurity.getUserToken(key), coursesData);
                return res.status(200).json(encryptedData);
            });
        } catch (error) {
            console.error("Error getting courses detail:", error);
            return res.status(500).json("Failed to get courses detail. " + error);
        }
    }


    /*---------------------------COURSES------------------------------ */
    static async getCoursePrefix(key, res) {
        try {
            db.execute(`
                SELECT DISTINCT coursePrefix
                FROM courses
                ORDER BY coursePrefix ASC`, (err, data) => {
                if (err) return res.status(500).json(err);

                const coursePrefixes = data.map((course, index) => ({
                    id: index + 1, // You can use index + 1 as a simple unique identifier
                    name: course.coursePrefix
                }));

                const encryptedData = MySecurity.encryptedData(MySecurity.getUserToken(key), coursePrefixes);
                return res.status(200).json(encryptedData);
            });
        } catch (error) {
            return res.status(500).json("Failed to get course prefixes. " + error);
        }
    }

    static async getCourseNumber(key, res) {
        try {
            db.execute(`
                SELECT DISTINCT courseNumber
                FROM courses
                ORDER BY courseNumber ASC`, (err, data) => {
                if (err) return res.status(500).json(err);

                const courseNumber = data.map((course, index) => ({
                    id: index + 1, // You can use index + 1 as a simple unique identifier
                    coursenumber: parseInt(course.courseNumber)
                }));

                const encryptedData = MySecurity.encryptedData(MySecurity.getUserToken(key), courseNumber);
                return res.status(200).json(encryptedData);
            });
        } catch (error) {
            return res.status(500).json("Failed to get course number. " + error);
        }
    }


    //Courses Filter Controller
    static async filterCourses(inputData, res) {
        try {
            const { termsID, departmentID, coursePrefix, courseNumber } = inputData;
            console.log(termsID, departmentID, coursePrefix, courseNumber);
            let query = `SELECT courses.*, terms.type AS term_type, department.type AS department_type
                 FROM courses
                 LEFT JOIN terms ON courses.termsID = terms.termsID
                 LEFT JOIN department ON courses.departmentID = department.departmentID
                 WHERE 1`;

            const params = [];

            if (termsID && termsID !== "All") {
                query += ` AND courses.termsID = ?`;
                params.push(termsID);
            }

            if (departmentID && departmentID !== "All") {
                query += ` AND courses.departmentID = ?`;
                params.push(departmentID);
            }

            if (coursePrefix && coursePrefix !== "All") {
                query += ` AND courses.coursePrefix = ?`;
                params.push(coursePrefix);
            }

            if (courseNumber && courseNumber !== "All") {
                query += ` AND courses.courseNumber = ?`;
                params.push(courseNumber);
            }
            console.log("param", params);

            db.execute(query, params, async (error, data) => {

                if (error) {
                    console.error("Error filtering courses:", error);
                    return res.status(500).json("Failed to filter courses. " + error.message);
                }
                console.log("data data", data);


                const courses = data.map(course => ({
                    id: course.coursesID,
                    crn: course.CRN,
                    prefix: course.coursePrefix,
                    number: course.courseNumber,
                    professor: course.professor,
                    term: course.term_type,
                    department: course.department_type
                }));
                console.log("hellllooo", courses);
                return res.status(200).json(courses);
            });

        } catch (error) {
            console.error("Error filtering courses:", error);
            return res.status(500).json("Failed to filter courses. " + error.message);
        }
    }

}
