const PORT = process.env.PORT || 3000;

require("./app")(PORT).then(resolve => {
    console.log(`App running on port: ${PORT}`);
});