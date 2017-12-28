const fs = require("fs");
const path = require("path");

const { reader } = require("./reader");
const { POSTS_DIR } = require('../app/constants');

const allPosts = () => {
    let posts = [];

    return new Promise((resolve, reject) => {
        try {
            fs.readdir(POSTS_DIR, async(err, data) => {
                if (err) {
                    reject(err);
                }

                for (let post of data) {
                    post = path.join(POSTS_DIR, post, 'index.md');
                    post = await reader(post);

                    posts.push(post);
                }
                         
                posts.sort((a, b) =>  new Date(b.date) - new Date(a.date));

                resolve(posts);
            });
        } catch (err) {
            reject(err);
        }
   });
};

const getPost = slug => {
    let file;

    return new Promise((resolve, reject) => {
        try {
            fs.readdir(POSTS_DIR, async(err, data) => {
                if (err) {
                    reject(err);
                }

                for (let folder of data) {
                    if (slug.toLowerCase() === folder.toLowerCase()) {
                        file = await reader(path.join(POSTS_DIR, folder, "index.md"));
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