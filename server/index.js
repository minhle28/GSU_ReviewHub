import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"

import { checkDatabase } from "./db.js";
import multer from "multer";
import fs from "fs";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from "path";
import Authentication from "./behavior/authentication.js";
import Courses from "./behavior/courses.js";
//import { Courses } from "../client/src/pages/courses/index.jsx";
// Server port
var app = express()
const port = 3000

app.use(express.json())
app.use(cookieParser())
// Allow CORS
app.use(cors());
// check database
checkDatabase();

// read picture from disk
const getImageData = (folder, imageName) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    let imagePath = path.join(__dirname, folder, imageName);
    try {
        // Read the contents of the image file
        const imageData = fs.readFileSync(imagePath);
        return imageData;
    } catch (error) {
        try {
            imagePath = path.join(__dirname, 'images', "not-found.png");
            const imageData2 = fs.readFileSync(imagePath);
            return imageData2;
        }
        catch (err) {
            console.error('Error reading image file:', error);
        }
        return null;
    }
};

// get image from clients
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/'); // Set your destination folder
    },
    filename: function (req, file, cb) {
        const list = file.originalname.split('.');
        cb(null, `${Date.now()}.${list[list.length - 1]}`); // Set your filename logic
    },
});
const upload = multer({ storage: storage });

// Switcher
app.post("/dummydata", upload.single('excelFile'), async (req, res) => {
    if (req === null) return res.status(400).json("Bad Request");
    console.log('body:');
    console.log('Received file:', req.file); // Log the received file
    console.log(req.body)
    let data = JSON.parse(req.body.data);
    let key = req.body.key;
    console.log('data');
    console.log(data);
    switch (data.action) {
        // authentication
        case "login":
            Authentication.login(data, res);
            break;
        case "register":
            Authentication.register(data, res);
            break;
        case "logout":
            Authentication.logout(key, res);
            break;
        case "getUserFullName":
            Authentication.getUserFullName(data, res);
            break;

        //term
        case "getTerms":
            Courses.getTerms(key, data, res);
            break;
        case "addTerms":
            const excelFilePath = req.file.path;
            // Now you can use the excelFilePath to read the Excel file
            data.excelFile = excelFilePath;
            Courses.addTerms(data.entry, res);
            break;
        case "deleteTerms":
            Courses.deleteTerms(data.entry, res);
            break;
        case "updateTerms":
            Courses.updateTerms(data.entry, res);
            break;
        case "getTermsDetail":
            Courses.getTermsDetail(key, data.entry, res);
            break;

        //department
        case "getDepartment":
            Courses.getDepartment(key, data, res);
            break;
        case "addDepartment":
            Courses.addDepartment(data.entry, res);
            break;
        case "deleteDepartment":
            Courses.deleteDepartment(data.entry, res);
            break;
        case "updateDepartment":
            Courses.updateDepartment(data.entry, res);
            break;
        case "getDepartmentDetail":
            Courses.getDepartmentDetail(key, data.entry, res);
            break;

        //courses
        case "getCourses":
            Courses.getCourses(key, data, res);
            break;
        case "addCourses":
            console.log('asdfjdfj',data.entry);
            Courses.addCourses(data.entry, res);
            break;
        case "deleteCourses":
            Courses.deleteCourses(data.entry, res);
            break;
        case "updateCourses":
            Courses.updateCourses(data.entry, res);
            break;
        case "getCoursesDetail":
            Courses.getCoursesDetail(key, data.entry, res);
            break;
            
        default:
            res.status(400).json("Bad Request");
            break;

    }
})

// send picture out
app.get('/dummydata/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    const imageData = getImageData('images', imageName);

    // Set appropriate headers
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Content-Length', imageData.length);

    // Send the image data as the response
    res.end(imageData);
});

app.get('/dummydata/default/:imageName', (req, res) => {
    //console.log(req.params)
    const imageName = req.params.imageName;
    const imageData = getImageData('default', imageName);

    // Set appropriate headers
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Content-Length', imageData.length);

    // Send the image data as the response
    res.end(imageData);
});

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})
