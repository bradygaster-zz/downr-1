const postsData = require("../utils/posts");
const pagesData = require("../utils/pages");

module.exports = async(router) => {
    router
        .get("/", async ctx => {
            ctx.redirect("articles");
        })
        .get("/articles", async ctx => {
			const posts = await postsData.allPosts();
            const title = "Home";

            await ctx.render("index", { posts, title });
        })
        .get("/articles/:slug", async ctx => {
			const post = await postsData.getPost(ctx.params.slug);
			const title = post.title;

			await ctx.render("post", { post, title });
        })
        .get("/:slug", async ctx => {
            const page = await pagesData.getPage(ctx.params.slug);
            const title = page.title;

            await ctx.render("page", { page, title });
        });
};