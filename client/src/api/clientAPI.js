import axios from "axios";
import MySecurity from "./mySecurity";
export const endPoint = "http://127.0.0.1:3000/dummydata/";

export default class ClientAPI {
    static async post(action, data, selectedImage = null) {
        let formData = new FormData();
        switch (action) {
            //------authentication------
            case "login":
            case "register":
            case "logout":
            case "getUserFullName":

            //------course------
            //term
            case "getTerms":
            case "addTerms":
            case "deleteTerms":
            case "updateTerms":
            case "getTermsDetail":

            //department
            case "getDepartment":
            case "addDepartment":
            case "deleteDepartment":
            case "updateDepartment":
            case "getDepartmentDetail":

            //courses
            case "getCourses":
            case "addCourses":
            case "deleteCourses":
            case "updateCourses":
            case "getCoursesDetail":
                console.log("data send: ", data);
                formData = MySecurity.encryptedPackage(action, data, selectedImage);
                break;
            default:
                //console.log("Bad request");
                return null;
        }
        return await axios.post(endPoint, formData);
    }
}
