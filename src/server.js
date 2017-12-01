const path = require("path");
const PORT = process.env.PORT || 3000;

const POSTS_DIR = path.join(__dirname, "..", "posts");

const runServer = async() => {
    const app = require("./app")(PORT, POSTS_DIR);

    console.log(`App running at ${PORT}`);
};

runServer();