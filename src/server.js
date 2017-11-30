const runServer = async() => {
    const app = require("./app")(process.env.PORT || 3000);

    console.log(`App running at ${process.env.PORT || 3000}`);
};

runServer();