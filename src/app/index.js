const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const morgan = require("koa-morgan");

module.exports = (port) => {
    const app = new Koa();
    const router = new Router();

    app.use(async (ctx, next) => {
        const start = Date.now();
        await next();
        const ms = Date.now() - start;

        ctx.set("X-Response-Time", `${ms}ms`);
    });

    app.use(async (ctx, next) => {
        const start = Date.now();
        await next();
        const ms = Date.now() - start;

        console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
    });
    
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
        app.listen(port, resolve);
    });
}