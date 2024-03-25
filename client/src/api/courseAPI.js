import axios from "axios";
const url = "http://127.0.0.1:3000/upload/";

export default class CourseAPI {
    static addCourses(data) {
        return  axios({
            method: "POST",
            url,
            data
         })
    }
}