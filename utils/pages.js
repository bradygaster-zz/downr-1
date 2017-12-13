const fs = require("fs");
const path = require("path");
const showdown  = require("showdown");
const matter = require("gray-matter");

const converter = new showdown.Converter({
    omitExtraWLInCodeBlocks: true,
    noHeaderId: true,
    tables: true
});

const PAGES_DIR = path.join(__dirname, "..", "pages");

const readFile = async(file) => {
    return new Promise((resolve, reject) => {
        try {
            fs.readFile(file, "utf-8", async(err, file) => {
                if (err) {
                    reject(err);
                }

                file = matter(file);

                file = {
                    title: file.data.title,
                    slug: file.data.slug,
                    content: converter.makeHtml(file.content)
                };

                resolve(file);
            });
        } catch (err) {
            reject(err);
        }
    });
};

const all = async() => {
    return new Promise((resolve, reject) => {
        let files = [];

        try {
            fs.readdir(PAGES_DIR, async(err, data) => {
                if (err) {
                    reject(err);
                }

                for (let file of data) {
                    files.push(await readFile(path.join(PAGES_DIR, file)));                        
                }
                
                resolve(files);
            });
        } catch (err) {
            reject(err);
        }
   });
};

module.exports.all = all;