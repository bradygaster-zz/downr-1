const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const morgan = require("koa-morgan");

module.exports = port => {
    const app = new Koa();
    const router = new Router(); 
    
    require("./routes")(router);

    app.use(bodyParser());
    app.use(router.routes());
    app.use(router.allowedMethods());

    return new Promise(resolve =>  app.listen(port, resolve));
}