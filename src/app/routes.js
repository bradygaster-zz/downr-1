const postsData = require("../services/posts");

module.exports = router => {
    router
        .get("/", async(ctx, next) => {
        	const title = "Home";
            const posts = await postsData.all();

            await ctx.render("index", { posts, title });
        })
        .get("/:slug", async(ctx, next) => {
			const post = await postsData.find(ctx.params.slug);
			
			await ctx.render("post", { post, title: post.title});

        	/*for (let post of posts) {
        		if (post.slug == ctx.params.slug) {
        			await ctx.render("post", { post, title: post.title});
        		} else {
        			ctx.status = 404;
        		}
        	}*/
        });
};