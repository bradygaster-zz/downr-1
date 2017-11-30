const PORT = process.env.PORT || 3000;

const runServer = async() => {
    const app = require("./app")(PORT);

    console.log(`App running at ${PORT}`);
};

runServer();