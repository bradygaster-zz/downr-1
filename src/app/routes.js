const postsService = require("../services/posts");

module.exports = router => {
    router
        .get("/", async(ctx, next) => { 
            const posts = await postsService();

            ctx.body = posts;
            ctx.status = 200;

            await next();
        });
};