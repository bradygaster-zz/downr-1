const fs = require("fs");
const moment = require("moment");
const showdown  = require("showdown");
const matter = require("gray-matter");

const reader = file => {
    const converter = new showdown.Converter({
        omitExtraWLInCodeBlocks: true,
        noHeaderId: true,
        tables: true
    });

    return new Promise((resolve, reject) => {
        try {
            fs.readFile(file, "utf-8", async(err, file) => {
                if (err) {
                    reject(err);
                }

                file = await matter(file);

                file = {
                    title: file.data.title,
                    slug: file.data.slug,
                    date: file.data.date ? moment(file.data.date, "DD-MM-YYYY").format("D MMMM YYYY") : null,
                    content: await converter.makeHtml(file.content)
                };

                resolve(file);
            });
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = { reader };