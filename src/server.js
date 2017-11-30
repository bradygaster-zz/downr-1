const runServer = async() => {
    const app = require("./app")();

    console.log(`App running at 3000`);
};

runServer();