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

const findPage = async(slug) => {
    return new Promise((resolve, reject) => {
       // let files = [];
        let file;

        try {
            fs.readdir(PAGES_DIR, async(err, data) => {
                if (err) {
                    reject(err);
                }

                for (let folder of data) {
                    file = path.join(PAGES_DIR, folder, "index.html");

                    //files.push(await fileReader.readFile(file));

                    if (folder == slug) {
                        file = await fileReader.readFile(file);

                        resolve(file);
                    }
                }
                
               /* for (let file of files) {
                    if (file.slug === slug) {
                        resolve(file);
                    }
                }*/
            });
        } catch (err) {
            reject(err);
        }
   });
};

module.exports.findPage = findPage;