const fs = require("fs");
const path = require("path");
const fileReader = require("./fileReader");

const PAGES_DIR = path.join(__dirname, "..", "pages");

const findPage = async(slug) => {
    return new Promise((resolve, reject) => {
        let file;

        try {
            fs.readdir(PAGES_DIR, async(err, data) => {
                if (err) {
                    reject(err);
                }

                for (let folder of data) {
                    if (slug === folder) {
                        file = await fileReader.readFile(path.join(PAGES_DIR, folder, "index.html"));
                    }
                }
                
                resolve(file);
            });
        } catch (err) {
            reject(err);
        }
   });
};

module.exports.findPage = findPage;