const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const morgan = require("koa-morgan");

module.exports = () => {
    const app = new Koa();
    const router = new Router();

    router
        .get("/", async(ctx, next) => { 
            ctx.body = Date.now();
            ctx.status = 200;

            await next();
        });

    app.use(bodyParser());
    app.use(router.routes());
    app.use(router.allowedMethods());

    return new Promise(resolve => {
        app.listen(3000, resolve);
    });
}