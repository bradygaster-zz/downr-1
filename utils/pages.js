const fs = require("fs");
const path = require('path');
const reader = require("./fileReader");

const { PAGES_DIR } = require('../app/constants');

const getPage = async(slug) => {
    let file;
    
    return new Promise((resolve, reject) => {
        try {
            fs.readdir(PAGES_DIR, async(err, data) => {
                if (err) {
                    reject(err);
                }

                for (let folder of data) {
                    if (slug === folder) {
                        file = await reader.readFile(path.join(PAGES_DIR, folder, "index.html"));
                    }
                }
                
                resolve(file);
            });
        } catch (err) {
            reject(err);
        }
   });
};

module.exports = { getPage };