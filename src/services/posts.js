const fs = require("fs");
const path = require("path");
const moment = require("moment");
const showdown  = require("showdown");
const matter = require("gray-matter");

const POSTS_DIR = path.join(__dirname, "..", "..", "posts");

function readFile(file) {
    const converter = new showdown.Converter();

    file = matter(fs.readFileSync(file, "utf-8"));

    file = {
        title: file.data.title,
        slug: file.data.slug,
        date: moment(file.data.date, "DD-MM-YYYY").format("DD MMMM YYYY"),
        content: converter.makeHtml(file.content)
    };

    return file;
}

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
                
                files.sort((a, b) =>  new Date(b.date) - new Date(a.date));

                resolve(files);
            });
        } catch (err) {
            reject(err);
        }
   });
};