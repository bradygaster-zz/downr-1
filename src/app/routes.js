const postService = require("../services/posts");

module.exports = router => {
    router
        .get("/", async(ctx, next) => { 
            const posts = await postService();
            
            ctx.type = 'text/plain; charset=utf-8';
            ctx.body = posts;
            ctx.status = 200;

            await next();
        });
};