const path = require("path");
const Koa = require("koa");
const Router = require("koa-router");
const compress = require("koa-compress");
const static = require("koa-static");
const render = require("koa-ejs");
const morgan = require("koa-morgan");
const bodyParser = require("koa-bodyparser");

module.exports = async(port) => {
    const app = new Koa();
    const router = new Router();

    render(app, {
        root: path.join(__dirname, "..", "views"),
        viewExt: "html",
        cache: false
    });

    if (process.env.NODE_ENV === "production") {
        render(app, {
            root: path.join(__dirname, "..", "views"),
            viewExt: "html",
            cache: true
        });
    }

    require("./routes")(router);
    
    app.use(compress());
    app.use(morgan("combined"));
    app.use(bodyParser());
    app.use(router.routes());
    app.use(router.allowedMethods());

    app.use(static(path.join(__dirname, "..", "public")));

    return new Promise(resolve =>  app.listen(port, resolve));
}