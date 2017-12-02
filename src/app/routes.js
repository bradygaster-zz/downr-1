const postService = require("../services/posts");

module.exports = router => {
    router
        .get("/", async(ctx) => {
        	const title = "Home";
            const posts = await postService();

            await ctx.render("index", { posts, title });
        });
};