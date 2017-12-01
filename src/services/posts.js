const path = require("path");
const fs = require("fs");

const POSTS_DIR = path.join(__dirname, "..", "..", "posts");

module.exports = async() => {
    return new Promise(resolve => {
        fs.readdir(POSTS_DIR, async(err, data) => {
            if (err) {
                throw err;
            }
            
            resolve(data);     
       });
   });
};