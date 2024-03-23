import { db } from "../db.js"
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import crypto from "crypto";

export default class Authentication {
    static register(data, res) {
        let entryData = data.entry;
        db.execute(`SELECT * FROM user WHERE email= '${entryData.email}'`, async (err, data) => {
            if (err) return res.json(err);
            if (data.length) return res.status(409).json("User already exists!");

            // encrypt password          
            const hash = await bcrypt.hash(entryData.password, 10);
            db.execute(`INSERT INTO user(email, password, fullName, isAdmin) VALUES ('${entryData.email}','${hash}','${entryData.fullName}',0)`, (err, data) => {
                // //console.log(data);
                if (err) return res.status(500).json(err);
                return res.status(200).json("User has been created.");

            })
        });
    }

    static login(data, res) {
        let entryData = data.entry;
        //console.log(entryData);
        db.execute(`SELECT * FROM user WHERE email= '${entryData.email}'`, (err, data) => {
            if (err) return res.json(err);
            if (data.length === 0) return res.status(401).json("email or password is incorrect...");
            console.log("RUn me");
            // check password       
            var isPasswordTrue = bcrypt.compareSync(entryData.password, data[0].password)
            if (!isPasswordTrue) return res.status(401).json("Unauthorized");

            // random key 
            const secretKey = this.generateRandomKey(8);
            // password is correct, store information as Json Token
            let token = jwt.sign({ id: data[0].userID, email: data[0].email, fullName: data[0].fullName }, secretKey);
            let { password, ...other } = data[0];
            let tokenS = secretKey + token;
            const currentDate = new Date();
            // insert token key to Table ?  

            db.execute(`INSERT INTO usertoken (userID, tokenKey, createdDate) VALUES (${other.userID},'${tokenS}','${currentDate}')`, (err, data2) => {
                if (err) return res.json(err);
                // put to client cookie ???
                res.cookie("access_token", tokenS, {
                    httpOnly: true
                });
                res.cookie("userID", other.userID, {
                    httpOnly: true
                });
                res.cookie("isAdmin", other.isAdmin, {
                    httpOnly: true
                });
                res.status(200).json(other);
            });
        });
    }

    static logout(key, res) {
        db.execute(`DELETE FROM usertoken WHERE tokenKey LIKE '${key}%'`, async (err, data) => {
            if (err) return res.json(err);
            // put to client cookie ???
            res.cookie("access_token", undefined, {
                httpOnly: true
            });
            res.cookie("userID", undefined, {
                httpOnly: true
            });
            res.cookie("isAdmin", undefined, {
                httpOnly: true
            });
            return res.status(200).json("Log out");
        });
    }

    static generateRandomKey(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const randomBytes = crypto.randomBytes(length);
        let randomKey = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = randomBytes[i] % characters.length;
            randomKey += characters.charAt(randomIndex);
        }

        return randomKey;
    }

    static getUserFullName(data, res) {
        let userID = data.userID; // Assuming you're passing userID in the request body
        db.execute(`SELECT fullName FROM user WHERE userID = ${userID}`, (err, data) => {
            if (err) return res.json(err);
            if (data.length === 0) return res.status(404).json("User not found");
    
            const fullName = data[0].fullName;
            return res.status(200).json({ fullName });
        });
    }  
}



