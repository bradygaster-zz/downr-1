const path = require("path");
const Koa = require("koa");
const Router = require("koa-router");
const render = require("koa-ejs");
const bodyParser = require("koa-bodyparser");
const morgan = require("koa-morgan");

module.exports = port => {
    const app = new Koa();
    const router = new Router();

    render(app, {
        root: path.join(__dirname, "..", "views"),
        //layout: 'template',
        viewExt: 'html',
        cache: false,
        debug: true
    });

    require("./routes")(router);
    
    app.use(morgan("combined"));
    app.use(bodyParser());
    app.use(router.routes());
    app.use(router.allowedMethods());

    return new Promise(resolve =>  app.listen(port, resolve));
}