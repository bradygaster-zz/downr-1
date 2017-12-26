const fs = require("fs");
const path = require("path");
const sass = require("node-sass");

const MAIN_SASS_STYLE = path.join(__dirname, "sass", "main.scss");
const PAGES_DIR = path.join(__dirname, "pages");
const CSS_STYLE = path.join(__dirname, "public", "css", "styles.css");

let content = sass.renderSync({ file: MAIN_SASS_STYLE }).css.toString();

fs.writeFile(CSS_STYLE, content, err => {
    if (err) {
        console.log(err);
    }

    console.log('Success compile Sass!');
}); 

/*fs.readdir(PAGES_DIR, (err, folders) => {
    if (err) {
        throw err;
    }

    let content = "";

    folders
        .map(folder => path.join(PAGES_DIR, folder))
        .forEach(folder => {
            fs.readdir(folder, (err, files) => {
                if (err) {
                    throw err;
                }

                files
                    .map(file => path.join(folder, file))
                    .filter(file => path.extname(file) === ".scss")
                    .forEach(file => {
                        sass.render({ file: file }, async(err, result) => {
                            if (err) {
                                throw err;
                            }

                            content += await result.css.toString()
                        });
                    });
            });
        });
});*/


/*
let content = sass.renderSync({ file: MAIN_SASS_STYLE }).css.toString();

fs.readdir(PAGES_DIR_STYLES, (err, files) => {
    if (err) {
        throw err;
    }

    files
        .map(file => path.join(PAGES_DIR_STYLES, file))
        .filter(file => fs.statSync(file).isFile())
        .forEach(file => {
            console.log(`${file} -> ${path.extname(file)}`);

            sass.render({ file: file }, (err, result) => {
                if (err) {
                    throw err;
                }

                content += result.css.toString();

                fs.writeFile(CSS_STYLES, content, err => {
                    if (err) {
                        throw err;
                    }
                }); 
            });
        });
});*/
