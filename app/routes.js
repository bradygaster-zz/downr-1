const postsData = require("../utils/posts");
const pagesData = require("../utils/pages");

module.exports = async(router) => {
    router
        .get("/", async ctx => {
            ctx.redirect("articles");
        })
        .get("/articles", async ctx => {
			const posts = await postsData.all();
			const title = "Home";

            await ctx.render("index", { posts, title });
        })
        .get("/articles/:slug", async ctx => {
			const post = await postsData.find(ctx.params.slug);
			const title = post.title;

			await ctx.render("post", { post, title });
        })
        .get("/pages/:slug", async ctx => {
            const page = await pagesData.findPage(ctx.params.slug);
            const title = page.title;

            await ctx.render("page", { page, title });
        });
};