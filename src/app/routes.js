const postsData = require("../services/posts");

module.exports = router => {
    router
        .get("/", async(ctx) => {
            ctx.redirect("articles")
        })
        .get("/articles", async(ctx) => {
			const posts = await postsData.all();
			const title = "Home";

            await ctx.render("index", { posts, title });
        })
        .get("/articles/:slug", async(ctx) => {
			const post = await postsData.find(ctx.params.slug);
			const title = post.title;

			await ctx.render("post", { post, title });
        });
};