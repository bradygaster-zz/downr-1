const path = require("path");
const PORT = process.env.PORT || 3000;

const app = require("./app")(PORT);

console.log(`App running at ${PORT}`);