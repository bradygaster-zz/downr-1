const postsData = require("../utils/posts");
const pagesData = require("../utils/pages");

module.exports = async(router) => {
    router
        .get("/", async(ctx) => {
            ctx.redirect("articles");
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
        })
        .get("/pages/:slug", async(ctx, next) => {
            const all = await pagesData.all();

            ctx.type = 'text/plain; charset=utf-8';
            ctx.body = all;

            await next();
        })
        .get("/about", async(ctx) => {
            const title = "About";

            await ctx.render("about", { title });
        });
};