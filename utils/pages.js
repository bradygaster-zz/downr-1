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

const all = async() => {
    return new Promise((resolve, reject) => {
        let files = [];

        try {
            

            fs.readdir(PAGES_DIR, async(err, data) => {
                if (err) {
                    reject(err);
                }

                for (let file of data) {
                    fs.readFile(path.join(PAGES_DIR, data), "utf-8", async(err, content) => {
                        if (err) {
                            console.log(err);
                        }
    
                        files.push(await matter(content));
                        
                        
                    });
                }
                
                resolve(files);
            });

            resolve(files);
        } catch (err) {
            reject(err);
        }
   });
};

module.exports.all = all;