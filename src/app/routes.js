const postService = require("../services/posts");

module.exports = router => {
    router
        .get("/", async(ctx, next) => {
        	const title = "Home";
            const posts = await postService();

            await ctx.render("index", { posts, title });
        })
        .get("/:slug", async(ctx, next) => {
        	const posts = await postService();

        	for (let post of posts) {
        		if (post.slug == ctx.params.slug) {

        			await ctx.render("post", { post, title: post.title});
        		} else {
        			ctx.status = 404;
        		}
        	}
        });
};