const fs = require("fs");
const path = require("path");
const moment = require("moment");
const showdown  = require("showdown");
const matter = require("gray-matter");

const POSTS_DIR = path.join(__dirname, "..", "..", "posts");

function readFile(file) {
    const converter = new showdown.Converter();

    return new Promise((resolve, reject) => {
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
    });
    

    /*file = matter(fs.readFileSync(file, "utf-8"));

    file = {
        title: file.data.title,
        slug: file.data.slug,
        date: moment(file.data.date, "DD-MM-YYYY").format("DD MMMM YYYY"),
        content: converter.makeHtml(file.content)
    };

    return file;*/
}

module.exports.all = async() => {
    return new Promise((resolve, reject) => {
        let files = [];

        //try {
            fs.readdir(POSTS_DIR, async(err, data) => {
                if (err) {
                    reject(err);
                }

                for (let folder of data) {
                    console.log(`folder = slug = ${folder}`);
                    files.push(await readFile(path.join(POSTS_DIR, folder, "index.md")));
                }
                
                files.sort((a, b) =>  new Date(b.date) - new Date(a.date));

                resolve(files);
            });
      /*  } catch (err) {
            reject(err);
        }*/
   });
};

module.exports.find = async(slug) => {
    return new Promise((resolve, reject) => {
        let file;

        //try {
            fs.readdir(POSTS_DIR, async(err, data) => {
                if (err) {
                    reject(err);
                }

                for (let folder of data) {
                    /*console.log(`folder = slug = ${folder}`);
                    files.push(await readFile(path.join(POSTS_DIR, folder, "index.md")));*/

                    if (slug === folder) {
                        file = await readFile(path.join(POSTS_DIR, folder, "index.md"));
                    }
                }
                
                //files.sort((a, b) =>  new Date(b.date) - new Date(a.date));

                resolve(file);
            });
      /*  } catch (err) {
            reject(err);
        }*/
   });
}