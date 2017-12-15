const fs = require("fs");
const path = require("path");
const sass = require("node-sass");

const MAIN_SASS_STYLE = path.join(__dirname, "sass", "main.scss");
const PAGES_DIR_STYLES = path.join(__dirname, "pages", "sass");
const CSS_STYLES = path.join(__dirname, "public", "css", "styles.css");

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
});
