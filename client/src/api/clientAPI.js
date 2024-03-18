import axios from "axios";
import MySecurity from "./mySecurity";
export const endPoint = "http://127.0.0.1:3000/dummydata/";

export default class ClientAPI{ 
    static async post(action,data,selectedImage =null){
        let formData = new FormData();
        switch(action){
            case "login":                
            case "register":               
            case "logout":
            case "getUserFullName":
                console.log("data send: ",data);
                formData = MySecurity.encryptedPackage(action, data, selectedImage);  
                break;
            default:
                //console.log("Bad request");
                return null;
        }       
        return await axios.post(endPoint, formData);        
    }
}
