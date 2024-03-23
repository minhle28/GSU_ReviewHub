import mysql from "mysql2"
import fs from "fs"

const dbConfig = {
   /// host: "localhost",
    host: "127.0.0.1",
    user: "root",
    //password: "taothik",
    password: "new_password",
    database: "reviewhub"
}

export const db = mysql.createConnection(dbConfig)

export const checkDatabase = async () => {   
    let db3 = mysql.createConnection({
        host: dbConfig.host,
        user: dbConfig.user,
        password: dbConfig.password,
    });
    // check if database exist
    db3.execute(`SHOW DATABASES LIKE "reviewhub"`, async (err, results) => {    
        if (err || results.length <= 0) {            
            console.log('Database does not exist.');   
            //create
            await db3.execute(`CREATE DATABASE reviewhub`, (err, results) => {
                if (err) return console.error('Created database error:', err);
                console.log("created database");
                // insert
                fs.readFile("initial_DB.sql", 'utf8', (err, data) => {
                    if (err) return console.error('Error reading file:', err);
                    console.log('Readed File initial_DB.sql');
                    db3.execute(data, (err, results) => {
                        if (err) {
                            console.error('Insert Table fail', err);
                            return console.error("Please manual insert in workbench");
                        } 
                        console.log('Initial Database sucessful');
                    });
                });
            });
        }
        else {
            console.log('Found Database');
            // count table
            await db3.execute(`SELECT COUNT(*) AS tableCount FROM information_schema.tables WHERE table_schema = "reviewhub"`, async (err, results) => {
                if (err) return console.error('Error counting tables:', err);
                const tableCount = results[0].tableCount;
                if (tableCount < 5) {
                    //drop
                    await db3.execute(`DROP DATABASE IF EXISTS reviewhub`, async (err, results) => {
                        if (err) return console.error('Drop database error:', err);
                        console.log('Dropped Database');   
                        // create
                        await db3.execute(`CREATE DATABASE reviewhub`, (err, results) => {
                            if (err) return console.error('Created database error:', err);
                            console.log("created database");
                            // insert
                            fs.readFile("initial_DB.sql", 'utf8', (err, data) => {
                                if (err) return console.error('Error reading file:', err);
                                console.log('Readed File initial_DB.sql');
                                db3.execute(data, (err, results) => {
                                    if (err){
                                        console.error('Insert Table fail', err);
                                        return console.error("Please manual insert in workbench");
                                    } 
                                    console.log('Initial Database sucessful');
                                });
                            });
                        });
                    });
                }
                else {
                    // pass
                    return console.log('Database maybe ok');
                }             
            });
        } 
    });
}
