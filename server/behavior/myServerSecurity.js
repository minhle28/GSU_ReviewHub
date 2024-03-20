import { db } from "../db.js"

{/*
Using Table: 
UserToken(userID,tokenKey,createdDate,status)
Mission encrypted/decrypted data
Package Struct:
req_encrypted.body = {
    key: partOfKey,
    data: encryptedData,
    image: image
}
decryptedData ={
    userID: userID,
    action: action,
    entry: data
}
Behavior:
use partOfkey to find full key in table
then compare userID is correct or not, 
if correct return decryptedData else return null
*/}

//import {JWE, JWK} from 'jose'; //error libarary

export default class MySecurity {
    static getUserToken(key){
        {/* connect the databse at server, client use cookie or location storage*/}
        if(key === null) return null;
        if (key === "newAccount") return {
            tokenKey:"createNewAccount"};
        const q = "SELECT * FROM UserToken WHERE tokenKey LIKE '?%'"
        db.execute(q, [key], async (err, data) => {
            if (err) return null;
            if (data.length) return null;

            // got the record, return it
            return data[0];
        });
    }
    static encryptedData(secretKey, jsonData){ 
        /*
        if (secretKey === null) return null;   
        // Tempary disable security
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
    static encryptedPackage(partOfKey,userID,action,data) {
        /*
        // Temporary disable security
        const serectData = this.getUserToken(partOfKey);
        if(serectData==null) return null;
        if(serectData.userID!=userID) return null;
        let jsonData = {
            userID: userID,
            action: action,
            entry: data
        };
        const encrytedD = this.encryptedData(serectData.tokenKey, jsonData);
        if(encrytedD === null) return null;        
        let ouput = {
            key: partOfKey,
            data: encrytedD
        }
        return ouput;
        */       
        let ouput = {
            key: partOfKey,
            data: {
                userID: userID,
                action: action,
                entry: data
            }
        }
        return ouput;
    }
    static decryptedData(secretKey, jsonData) {   
        /*
         if (secretKey === null) return null;
        // Temporary disable security
        // try Decrypt the encrypted data using JWE
        const jwk = JWK.asKey({ k: secretKey, alg: 'dir' });

        JWE.createDecrypt(jwk)
            .decrypt(jsonData, 'utf8')
            .then((result) => {
                let decryptedData = JSON.parse(result.payload.toString('utf8'));             
                return decryptedData;
            })
            .catch((error) => console.error('Decryption Error:', error));
        return null;
        */
       return jsonData;
    }
    static decryptedPackage(input) {
        /* 
        // Temporary disable security
        const serectData = this.getUserToken(input.body.key);
        if (serectData === null) return null;   
        
        let decryptedD = this.decryptedData(serectData.tokenKey, input.body.data);
        if(decryptedD === null) return null;
        if (serectData.tokenKey !="createNewAccount")
            if (decryptedD.userID !== serectData.userID) return null;
        input.body.data = decryptedD;
        */
        return input.body.data;
    }
}