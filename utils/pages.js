const fs = require("fs");
const path = require("path");
const showdown  = require("showdown");
const matter = require("gray-matter");

const converter = new showdown.Converter({
    omitExtraWLInCodeBlocks: true,
    noHeaderId: true,
    tables: true
});

const fileReader = require("./fileReader");

const PAGES_DIR = path.join(__dirname, "..", "pages");

//Todo
const findPage = async(slug) => {
    return new Promise((resolve, reject) => {
        let files = [];
        let file;
        try {
            fs.readdir(PAGES_DIR, async(err, data) => {
                if (err) {
                    reject(err);
                }

                for (let file of data) {
                    file = path.join(PAGES_DIR, file);

                    if (fs.statSync(file).isFile()) {
                        files.push(await fileReader.readFile(file));
                    }
                }
                
                for (let file of files) {
                    if (file.slug === slug) {
                        resolve(file);
                    }
                }
            });
        } catch (err) {
            reject(err);
        }
   });
};

module.exports.findPage = findPage;