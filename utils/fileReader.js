const fs = require("fs");
const moment = require("moment");
const showdown  = require("showdown");
const matter = require("gray-matter");

const converter = new showdown.Converter({
    omitExtraWLInCodeBlocks: true,
    noHeaderId: true,
    tables: true
});

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
                    date: moment(file.data.date, "DD-MM-YYYY").format("DD MMMM YYYY"),
                    content: converter.makeHtml(file.content)
                };

                resolve(file);
            });
        } catch (err) {
            reject(err);
        }
    });
};

module.exports.readFile = readFile;