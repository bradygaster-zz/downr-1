const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const POSTS_DIR = path.join(__dirname, "..", "..", "posts");

const readFile = filename => {
    return new Promise((resolve, reject) => {
        try {
            fs.readFile(filename, "utf-8", (err, file) => {
                if (err) {
                    reject(err);
                }
                
                resolve(matter(file));
            });
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = async() => {
    return new Promise((resolve, reject) => {
        let files = [];

        try {
            fs.readdir(POSTS_DIR, async(err, data) => {
                if (err) {
                    reject(err);
                }

                for (let folder of data) {
                    files.push(readFile(path.join(POSTS_DIR, folder, "index.md")));
                }

                resolve(files);            
            });
        } catch (err) {
            reject(err);
        }
   });
};