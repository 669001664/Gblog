const model = require('../models/blogModel')
const fmt = require('../utils/dataTimeUtil')

module.exports = {
    async welcome(ctx) {
        let results = await model.getBlogs();
        let blogs = results
        for (item in blogs) {
            blogs[item].post_time = fmt.formatTime('yyyy-MM-dd hh:mm:ss', blogs[item].post_time)
        }
        if (results.length > 0) {
            ctx.body = {
                state: "success",
                blogs,
            }
        }
    },
    async getDetail(ctx) {

        let { blogId } = ctx.query;
        let results = await model.getBlogById(blogId);
        if (results.length > 0) {
            let { blog_id, title, content, post_time } = results[0];
            post_time = fmt.formatTime('yyyy-MM-dd hh:mm:ss', post_time)
            let blogInfo = {
                blog_id,
                title,
                content,
                post_time,
            };
            blogInfo.comments = [];
            for (let i = 0; i < results.length; i++) {
                let obj = results[i];
                blogInfo.comments.push({
                    comm_id: obj.comm_id,
                    comm_content: obj.comm_content,
                    comm_post_time: obj.comm_post_time ? fmt.formatTime('yyyy-MM-dd hh:mm:ss', obj.comm_post_time) : obj.comm_post_time,
                    username: obj.username
                });
            }
            ctx.body = {
                state: "success",
                blogInfo,
            }
        }
    },
    async saveArticle(ctx) {
        let { user_id, title, content } = ctx.request.body
        let results = await model.saveBlog({ user_id, title, content, comment: '评论(0)' })
        if (results.insertId) {
            ctx.body = {
                state: 'success'
            }
        }
    },
    async saveComment(ctx) {
        let { user_id, content, blog_id } = ctx.request.body
        let results = await model.saveCommt({ user_id, content, blog_id })
        if (results.insertId) {
            ctx.body = {
                state: 'success'
            }
        }
    },
    async saveReply(ctx) {
        let { comm_id, reply_content } = ctx.request.body
        let results = await model.saveRep({ comm_id, reply_content })
        if (results.insertId) {
            ctx.body = {
                state:'success'
            }
        }
    },
    async getReply(ctx) {
        let { comm_id } = ctx.request.body
        let results = await model.getReply({ comm_id })
        let replys = []
        console.log(comm_id);
        if (results.length > 0) {
            for (item in results) {
                if (results[item].comm_id == comm_id) {
                  replys.push(results[item])
              }
            }
            ctx.body = {
                state: 'success',
                replys
            }
       } 
    }

}