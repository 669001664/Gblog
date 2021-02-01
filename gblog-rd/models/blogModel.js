const db = require("./db");

module.exports = {
    getBlogs() {
        return db.query(`SELECT * FROM t_blog`);
    },
    getBlogById(blogId) {
        return db.query(`
        SELECT blog.*, comm.comm_id, comm.content as comm_content, comm.post_time as comm_post_time, usr.username
        FROM t_blog blog  LEFT JOIN t_comment comm 
        ON comm.blog_id=blog.blog_id 
        LEFT JOIN t_user usr ON comm.user_id=usr.user_id
        WHERE blog.blog_id=?`, [blogId]);
    },
    saveBlog(article) {
        let sql = `insert into t_blog set ?`
        return db.query(sql, article)
    },
    saveCommt(comments) {
        let sql = `insert into t_comment set ?`
        console.log(comments);
        return db.query(sql, comments)
    },
    saveRep(reply) {
        let sql = `insert into t_reply set ?`
        console.log(reply);
        return db.query(sql, reply)
    },
    getReply(id) {
        console.log(id);
        let sql = `SELECT * FROM t_reply`
        return db.query(sql,id)
    }
};