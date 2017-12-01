const fs = require("fs");
const path = require("path");

const POSTS_DIR = path.join(__dirname, "..", "..", "posts");

const readFile = function async(filename) {
    return new Promise(function (resolve, reject) {
        try {
            fs.readFile(filename, "utf-8", function(err, buffer){
                if (err) reject(err); else resolve(buffer);
            });
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = async() => {
    
    return new Promise(resolve => {
        fs.readdir(POSTS_DIR, async(err, data) => {
            if (err) {
                throw err;
            }
            let files = [];

            for (let folder of data) {
                files.push(await readFile(path.join(POSTS_DIR, folder, "index.md")));
            }

            resolve(files);            
        });
   });
};