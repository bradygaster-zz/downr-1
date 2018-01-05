const postsData = require("../utils/posts");
const pagesData = require("../utils/pages");

module.exports = async(router) => {
    router
        .get("/", async ctx => {
            ctx.redirect("articles");
        })
        .get("/articles", async ctx => {
			const posts = await postsData.allPosts();

            await ctx.render("index", { posts, title: "Home" });
        })
        .get("/articles/:slug", async ctx => {
			const post = await postsData.getPost(ctx.params.slug);

			await ctx.render("post", { post, title: post.title });
        })
        .get("/:slug", async ctx => {
            const page = await pagesData.getPage(ctx.params.slug);

            await ctx.render("page", { page, title: page.title });
        });
};