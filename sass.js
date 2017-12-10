const fs = require("fs");
const path = require("path");
const sass = require("node-sass");

console.log("Compiling sass");

const PAGES_DIR_STYLES = path.join(__dirname, "pages", "sass");
const CSS_STYLES = path.join(__dirname, "public", "css", "styles.css");

let content = "";

fs.readdir(PAGES_DIR_STYLES, function (err, files) {
    if (err) {
        throw err;
    }

    files.map(function (file) {
        return path.join(PAGES_DIR_STYLES, file);
    }).filter(function (file) {
        return fs.statSync(file).isFile();
    }).forEach(function (file) {
        console.log("%s (%s)", file, path.extname(file));

        sass.render({
        	file: file
        }, function(err, result) {
        	if (err) {
        		throw err;
    		}

    		content += result.css.toString();

    		fs.writeFile(CSS_STYLES, content, function(err) {
			    if(err) {
			        return console.log(err);
			    }

			    console.log("Add pages styles");
			}); 
        });
    });
});