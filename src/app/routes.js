const postService = require("../services/posts");

module.exports = router => {
    router
        .get("/", async(ctx, next) => { 
            const posts = await postService();

            ctx.body = posts;
            ctx.status = 200;

            await next();
        });
};