const fs = require("fs");
const path = require("path");
const fileReader = require("./fileReader");

const POSTS_DIR = path.join(__dirname, "..", "posts");

const allPosts = async() => {
    let file;
    let files = [];

    return new Promise((resolve, reject) => {
        try {
            fs.readdir(POSTS_DIR, async(err, data) => {
                if (err) {
                    reject(err);
                }

                for (let folder of data) {
                    file = await fileReader.readFile(path.join(POSTS_DIR, folder, "index.md"));

                    files.push(file);
                }
                
                files.sort((a, b) =>  new Date(b.date) - new Date(a.date));

                resolve(files);
            });
        } catch (err) {
            reject(err);
        }
   });
};

const getPost = async(slug) => {
    let file;

    return new Promise((resolve, reject) => {
        try {
            fs.readdir(POSTS_DIR, async(err, data) => {
                if (err) {
                    reject(err);
                }

                for (let folder of data) {
                    if (slug === folder) {
                        file = await fileReader.readFile(path.join(POSTS_DIR, folder, "index.md"));
                    }
                }

                resolve(file);
            });
        } catch (err) {
            reject(err);
        }
   });
};

module.exports = { allPosts, getPost };