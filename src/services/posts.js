const fs = require("fs");
const path = require("path");

const POSTS_DIR = path.join(__dirname, "..", "..", "posts");

const readFile = function async(filename) {
    return new Promise((resolve, reject) => {
        try {
            fs.readFile(filename, "utf-8", (err, file) => {
                if (err) {
                    reject(err); 
                }
                
                resolve(file);
            });
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = async() => {
    return new Promise((resolve, reject) => {
        let files = [];

        fs.readdir(POSTS_DIR, async(err, data) => {
            if (err) {
                reject(err);
            }

            for (let folder of data) {
                files.push(await readFile(path.join(POSTS_DIR, folder, "index.md")));
            }

            resolve(files);            
        });
   });
};