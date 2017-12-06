const PORT = process.env.PORT || 3000;

require("./app")(PORT);

console.log(`App running on port: ${PORT}`);