const postService = require("../services/posts");

module.exports = router => {
    router
        .get("/", async(ctx) => { 
            const posts = await postService();

            console.log(posts);

            await ctx.render("index", { posts });
        });
};