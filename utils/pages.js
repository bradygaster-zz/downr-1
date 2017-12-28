const fs = require("fs");
const path = require('path');

const { reader } = require("./reader");
const { PAGES_DIR } = require('../app/constants');

const getPage = slug => { 
    let file;

    return new Promise((resolve, reject) => {
        try {
            fs.readdir(PAGES_DIR, async(err, data) => {
                if (err) {
                    reject(err);
                }

                for (let page of data) {
                    if (slug.toLowerCase() === page.toLowerCase()) {
                        file = path.join(PAGES_DIR, page, 'index.html');
                        file = await reader(file);
                    }
                }
                
                resolve(file);
            });
        } catch (err) {
            reject(err);
        }
   });
};

module.exports = { getPage };