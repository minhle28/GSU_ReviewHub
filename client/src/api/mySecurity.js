
import Cookies from 'js-cookie';
// import { JWE, JWK } from 'jose'; //error libarary

{/*

Mission encrypted/decrypted data
Package Struct:
req_encrypted.body = {
    key: partOfKey,
    data: encryptedData ={
        userID: userID,
        action: action,
        entry: data
    },
    image: image
}
Behavior:
use tokenS key
*/}
export default class MySecurity {
    static getUserToken() {
        {/* connect the databse at server, client use cookie or location storage*/ }
        const accessToken = Cookies.get('access_token');
        if (accessToken === null) return "createNewAccount";
        return accessToken?"":accessToken;
    }
    static encryptedData(jsonData) {
        /*        
        // Tempary disable security
        let secretKey = this.getUserToken();
        // Create a JSON Web Key (JWK) from the secret key
        const jwk = JWK.asKey({ k: secretKey, alg: 'dir' });

        // Encrypt the JSON data using JWE
        JWE.createEncrypt({ format: 'compact', contentAlg: 'A256GCM' }, jwk)
            .update(JSON.stringify(jsonData), 'utf8')
            .final()
            .then((result) => {
                return result;
            })
            .catch((error) => console.error('Encryption Error:', error));
        return null;
        */
        return jsonData;
    }
    static encryptedPackage(action, data, selectedImage) {
        /* 
        // temporary disable security
        let partOfKey = "createNewAccount"
        let secretKey = this.getUserToken();
        //console.log(secretKey);
        
        if (secretKey !== null && secretKey !== "createNewAccount") {
            partOfKey = secretKey.substring(0, Math.floor(Math.random() * (20 - 10 + 1) + 10));
        }
        
        let jsonData = {
            userID: Cookies.get("userID"),
            action: action,
            entry: data
        };
        const encrytedD = this.encryptedData(jsonData);
       
        let formData = new FormData();
        if (selectedImage) {
            formData.append('image', selectedImage);
        }
        formData.append('key', partOfKey);
        formData.append('data', encrytedD);      
        */
        
        let jsondata = {
            userID: Cookies.get("userID"),
            action: action,
            entry: data
        };
        let formData = new FormData();        
        formData.append('key', "");
        formData.append('data', JSON.stringify(jsondata));
        if (selectedImage !==null && selectedImage !== undefined) {
            formData.append('picture', selectedImage);
        }
        return formData;
    }
    static decryptedData(jsonData) {
        /*
        // Tempary disable security
        let secretKey = this.getUserToken();  
        // try Decrypt the encrypted data using JWE
        const jwk = JWK.asKey({ k: secretKey, alg: 'dir' });
        JWE.createDecrypt(jwk)
            .decrypt(jsonData, 'utf8')
            .then((result) => {
                const decryptedData = JSON.parse(result.payload.toString('utf8'));             
                return decryptedData;
            })
            .catch((error) => console.error('Decryption Error:', error));
        return null;
        */
        return jsonData;
    }
}