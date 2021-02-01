<template>
  <body>
    <a name="top" id="top"></a>
    <header>
      <div class="content clearfix">
        <a class="logo" href=" http://localhost:8080/">MoonLight</a>
        <nav>
          <em></em>
          <ul>
            <li><a title="首页" href=" http://localhost:8080/">首页</a></li>

            <li>
              <a title="留言" href=" http://localhost:8080/login">管理</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    <div class="container">
      <div class="blog">
        <div class="blog-title">
          <h3>{{ blog.title }}</h3>
          <span>{{ blog.post_time }} </span>
        </div>
        <div class="blog-content">{{ blog.content }}</div>
      </div>
      <div class="content">
        <div class="main detail" id="app">
          <div class="ss_link">
            <p>文章标题：{{ blog.title }}</p>
            <p>本文地址：<a href="">*************************</a></p>
            <p>博客地址：<a href="#">***************</a></p>
          </div>
          <div>
            <div class="comments_wenzi">
              <div class="i-publish">
                <form data-v-67070f71="">
                  <div data-v-67070f71="" class="i-publish-content">
                    <textarea
                      v-model="comment"
                      data-v-67070f71=""
                      required="required"
                    ></textarea>
                  </div>
                  <div data-v-67070f71="" class="manager">
                    <div data-v-67070f71="">
                      <input
                        v-model="userId"
                        data-v-67070f71=""
                        maxlength="28"
                        required="required"
                        type="text"
                        placeholder="* 请输入您的ID"
                        class="text"
                        value=""
                      />
                    </div>
                    <div data-v-67070f71="" class="sss">
                      <button
                        @click="saveComment"
                        data-v-731308b2=""
                        data-v-67070f71=""
                        class="i-btn"
                      >
                        <span data-v-731308b2="">提交评论</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div class="list">
                <h3 class="title">评论</h3>
                <div class="nocomments">
                  <div class="comments">
                    <div
                      class="comment"
                      v-for="item in blog.comments"
                      :key="item.comm_id"
                    >
                      <div class="comment-content">{{ item.comm_content }}</div>
                      <div v-if="item.username" class="comment-info">
                        <span class="userinfo">用户:{{ item.username }}</span>
                        <span class="post-time"
                          >时间:{{ item.comm_post_time }}
                          <button @click="show(item.comm_id)">
                            查看回复
                          </button></span
                        >
                      </div>
                      <div v-if="item.comm_id == isShow">
                        <input v-model="reply" type="text" />
                        <button @click="saveReply(item.comm_id)">提交</button>
                      </div>
                      <div v-if="item.comm_id == isShow">
                        <ul v-for="item in replys" :key="item.reply_id">
                          <li>{{ item.reply_content }}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="sidenav" style="display: block">
          <ul class="catelog">
            <li>
              <a href="javascript:" offsettop="0"></a>
            </li>
          </ul>
        </div>
      </div>
      <img src="view.html" alt="" width="0" height="0" />
    </div>
    <footer>
      <p>
        <a href="https://www.xiabingbao.com/flinks.html" target="_blank"
          >友情链接</a
        >
        | © 月光的博客 2021
        <a href="https://www.xiabingbao.com/atom.xml">RSS</a> |
        京ICP备16039464号
      </p>
    </footer>
  </body>
</template>

<script>
export default {
  data() {
    return {
      blog: "",
      comment: "",
      userId: "",
      isShow: "",
      reply: "",
      replys: [],
    };
  },
  created() {
    this.getBlogDetail();
  },
  methods: {
    getBlogDetail() {
      let blogId = this.$route.params.blogId;
      this.$http
        .get("/blog/detail", {
          params: {
            blogId: blogId,
          },
        })
        .then((res) => {
          let { state, blogInfo } = res.data;
          console.log(blogInfo);
          if (state == "success") {
            this.blog = blogInfo;
          }
        });
      // .catch((err) => {
      //   // alert('请求未授权-catch!');
      //   console.log(err);
      //   this.$router.push("/login");
      // });
    },
    saveComment() {
      let blogId = this.$route.params.blogId;
      let userId = this.userId;
      let comment = this.comment;
      this.$http
        .post("/blog/comment", {
          content: comment,
          blog_id: blogId,
          user_id: userId,
        })
        .then((res) => {
          if (res.data.state == "success") {
            this.getBlogDetail();
          }
        });
    },
    show(id) {
      this.isShow = id;
      this.$http
        .post("blog/revert", {
          comm_id: id,
        })
        .then((res) => {
          console.log(res);
          this.replys = res.data.replys;
        });
    },
    saveReply(id) {
      let commId = id;
      let content = this.reply;
      this.$http
        .post("blog/reply", {
          comm_id: commId,
          reply_content: content,
        })
        .then((res) => console.log(res));
      this.isShow = "";
      this.reply = "";
    },
  },
};
</script>

<style lang="scss">
/*! @2020-11-20 22:35:06 */
blockquote,
body,
button,
dd,
dl,
dt,
fieldset,
form,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
input,
legend,
li,
ol,
p,
pre,
td,
textarea,
th,
ul {
  margin: 0;
  padding: 0;
}
body,
button,
input,
select,
textarea {
  font: 16px/1.5 -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC,
    Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei,
    sans-serif;
  color: #2c2c3b;
  font-weight: 400;
  word-wrap: break-word;
  -webkit-font-kerning: normal;
  font-kerning: normal;
  -ms-font-feature-settings: "kern", "liga", "clig", "calt";
  font-feature-settings: "kern", "liga", "clig", "calt", "kern";
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 100%;
}
address,
cite,
dfn,
em,
var {
  font-style: normal;
}
code,
kbd,
pre,
samp {
  font-family: source code pro, couriernew, courier, pingfang sc medium;
}
small {
  font-size: 12px;
}
ol,
ul {
  list-style: none;
}
a {
  text-decoration: none;
}
sup {
  vertical-align: text-top;
}
sub {
  vertical-align: text-bottom;
}
legend {
  color: #000;
}
fieldset,
img {
  border: 0;
}
button,
input,
select,
textarea {
  font-size: 100%;
  outline: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
a {
  color: #4183c4;
}
[v-cloak] {
  display: none;
}
body {
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  -webkit-overflow-scrolling: touch;
}
header {
  position: relative;
  box-shadow: inset 0 -1px 0 #f3f3f4;
}
header .content {
  height: 78px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
header .logo {
  display: block;
  font-family: Courgette, cursive;
  font-size: 25px;
  font-weight: bolder;
  color: #4d444f;
  line-height: 25px;
}
header ul {
  position: relative;
  display: block;
  display: flex;
}
header ul li {
  display: block;
  margin-left: 18px;
}
header ul li a {
  padding: 2px;
  color: #2c2c3b;
  text-decoration: none;
  font-size: 18px;
  position: relative;
}
header ul li a:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: -4px;
  left: 0;
  background-color: #6891ff;
  visibility: hidden;
  transform: scaleX(0);
  transition: all 0.3s ease-in-out 0s;
}
header ul li a:hover:before {
  visibility: visible;
  transform: scaleX(1);
}
.container {
  padding-top: 20px;
}
.content {
  margin: 0 auto;
  //   zoom: 1;
}
.container .blog {
  width: 1080px;
  margin: 0 auto;
  text-align: left;
}
.ss_link {
  text-align: left;
}
footer {
  margin: 20px 0;
  text-align: center;
  font-size: 15px;
}
@media screen and (max-width: 1080px) {
  .content {
    width: auto;
    padding: 0 10px;
  }
  .content .main {
    width: 100%;
    float: none;
  }
  .content .main .wechat_pub {
    display: block;
  }
  .content .aside,
  .sidenav {
    display: none;
  }
}
@media screen and (max-width: 700px) {
  .navbar form,
  .qrcode {
    display: none;
  }
  .wechat_pub img {
    width: 165px;
    height: 165px;
  }
}
@media screen and (max-width: 462px) {
  .detail h1 {
    font-size: 24px;
  }
  nav em {
    display: block;
    cursor: pointer;
  }
  nav em:after {
    content: "\2630";
    font-size: 1.5em;
    margin-top: 10px;
    display: block;
  }
  nav ul {
    position: absolute;
    top: 52px;
    width: 100%;
    left: 0;
    display: none;
    background-color: #2c3e50;
  }
  nav ul li {
    margin-left: 0;
    width: 100%;
    text-align: center;
  }
  nav ul li a {
    color: #fff;
  }
  nav ul li a:hover {
    background: none;
  }
  .wechat_pub img {
    width: 130px;
    height: 130px;
  }
}
.i-btn[data-v-731308b2] {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-color: #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  color: #409eff;
  background: #ecf5ff;
  border-color: #b3d8ff;
}
.i-btn[data-v-731308b2]:hover {
  background: #409eff;
  border-color: #409eff;
  color: #fff;
}
.submit_disabled[data-v-731308b2] {
  cursor: not-allowed;
}
.submit_disabled[data-v-731308b2],
.submit_disabled[data-v-731308b2]:hover {
  color: #8cc5ff;
  background-color: #ecf5ff;
  border-color: #d9ecff;
}
.emoji-content[data-v-8994ac90] {
  width: 340px;
  text-align: left;
  -webkit-box-shadow: 0 0 8px #ccc;
  box-shadow: 0 0 8px #ccc;
  padding: 6px;
  position: absolute;
  top: 36px;
  right: 104px;
  left: auto;
  z-index: 19;
  background-color: #fff;
}
.emoji-content .con a[data-v-8994ac90] {
  border: 1px solid transparent;
  display: inline-block;
}
.emoji-content .con a[data-v-8994ac90]:hover {
  -webkit-transform: scale(1.4);
  transform: scale(1.4);
}
.i-publish .i-publish-content[data-v-67070f71] {
  width: 755px !important;
  padding: 10px 4px;
  border: 1px solid #9c9c9c;
  margin-bottom: 4px;
}
.i-publish .i-publish-content textarea[data-v-67070f71] {
  min-height: 120px;
  width: 100%;
  resize: none;
  border: 0;
  font-size: 14px;
  outline: none;
}
.i-publish .submitTip[data-v-67070f71] {
  margin-right: 12px;
  color: #666;
  font-size: 13px;
}
.i-publish .ss[data-v-67070f71] {
  margin-top: 6px;
  text-align: right;
}
.i-publish .ss span[data-v-67070f71] {
  color: #666;
  margin-right: 10px;
}
.i-publish .ss span em[data-v-67070f71] {
  color: red;
}
.i-publish .manager[data-v-67070f71] {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
.i-publish .manager .text[data-v-67070f71] {
  padding: 10px 2px;
  font-size: 14px;
  margin-right: 6px;
}
.i-publish .manager .captcha[data-v-67070f71] {
  width: 100px;
}
.i-publish .manager .sss[data-v-67070f71] {
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end;
}
.i-publish .manager .sss .ssb[data-v-67070f71],
.i-publish .manager .sss[data-v-67070f71] {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
@media screen and (max-width: 530px) {
  .i-publish .manager .sss[data-v-67070f71],
  .i-publish .manager[data-v-67070f71] {
    display: block;
  }
}
.l_post[data-v-4f8e9454] {
  border-bottom: 1px dashed #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
}
.l_post[data-v-4f8e9454]:last-child {
  border-bottom: none;
}
.tt[data-v-4f8e9454] {
  font-size: 26px;
  border-bottom: 2px solid #333;
  padding-bottom: 6px;
  margin-bottom: 26px;
}
.avatar[data-v-4f8e9454] {
  float: left;
}
.avatar img[data-v-4f8e9454] {
  width: 42px;
  height: 42px;
  border-radius: 50%;
}
.avatar p[data-v-4f8e9454] {
  text-align: center;
  margin-top: 6px;
  font-size: 13px;
  color: #666;
}
.comment-text {
  width: 730px;
  height: 200px;
}
.avatarimg[data-v-4f8e9454] {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 6px;
}
.nickname[data-v-4f8e9454] {
  color: #61b400;
}
.bozhu[data-v-4f8e9454] {
  color: #f7420a;
}
.msg[data-v-4f8e9454] {
  padding-left: 60px;
}
.msg .floor[data-v-4f8e9454] {
  float: right;
  color: #555;
}
.msg .time[data-v-4f8e9454] {
  color: #555;
  font-size: 15px;
}
.msg .createtime[data-v-4f8e9454] {
  color: #888;
  margin-left: 8px;
  font-size: 14px;
}
.msg .con[data-v-4f8e9454] {
  padding: 10px 0 20px;
  word-break: break-all;
}
.msg .con p[data-v-4f8e9454] {
  padding-bottom: 4px;
  line-height: 26px;
}
.msg .con p code[data-v-4f8e9454] {
  padding: 3px 4px;
  color: #c7254e;
  background-color: #f9f9fd;
  margin: 0 2px;
  font-family: consolas, courier new;
  font-size: 96%;
  word-wrap: break-word;
  word-break: normal;
}
.msg .con pre[data-v-4f8e9454] {
  display: block;
  overflow: hidden;
  padding: 0.5em;
  color: #333;
  background: #f8f8f8;
  -webkit-text-size-adjust: none;
}
.msg .con pre code[data-v-4f8e9454] {
  overflow: auto;
  max-height: 500px;
}
.reply[data-v-4f8e9454] {
  background: #f9f9f9;
  margin-top: 6px;
  padding: 10px;
  position: relative;
}
.reply .msg[data-v-4f8e9454] {
  padding-left: 0;
}
.reply .msg .avatar[data-v-4f8e9454] {
  margin-right: 4px;
}
.reply .msg .avatar img[data-v-4f8e9454] {
  width: 24px;
  height: 24px;
  border-radius: 50%;
}
.reply .time[data-v-4f8e9454] {
  font-size: 13px;
}
.reply .con[data-v-4f8e9454] {
  padding: 0;
  font-size: 14px;
  color: #444;
}
.reply .con .reply_con[data-v-4f8e9454] {
  padding: 6px 0;
  word-break: break-all;
}
.reply .rpage[data-v-4f8e9454] {
  text-align: right;
}
.reply .rpage a[data-v-4f8e9454] {
  padding: 0 6px;
}
.reply .rpage .cur[data-v-4f8e9454] {
  color: #888;
  cursor: default;
}
.reply .toreply textarea[data-v-4f8e9454] {
  width: 100%;
  height: 60px;
  resize: none;
}
.reply .toreply p[data-v-4f8e9454] {
  text-align: right;
}
.reply .toreply p span[data-v-4f8e9454] {
  color: #666;
}
.reply .toreply p input[data-v-4f8e9454] {
  padding: 2px 6px;
}
.wrapper[data-v-223af056] {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 9;
}
.wrapper .dialog[data-v-223af056] {
  position: relative;
  margin: 0 auto 50px;
  background: #fff;
  border-radius: 2px;
  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 580px;
  max-width: 98%;
  padding: 20px;
  margin-top: 15vh;
}
.wrapper .dialog .close[data-v-223af056] {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 27px;
  line-height: 50px;
  height: 50px;
  width: 50px;
  text-align: center;
  text-decoration: none;
}
.wrapper .dialog .header[data-v-223af056] {
  margin-bottom: 10px;
}
.wrapper .dialog .header .title span[data-v-223af056] {
  color: #61b400;
}
.wrapper .dialog .header .reply-content[data-v-223af056] {
  color: #888;
  font-size: 14px;
  margin-top: 6px;
}
.wrapper .dialog .body textarea[data-v-223af056] {
  width: 100%;
  height: 160px;
  resize: none;
}
.wrapper .dialog .footer[data-v-223af056] {
  text-align: right;
  margin-top: 8px;
}
.wrapper .dialog .footer .cancel[data-v-223af056] {
  margin-right: 26px;
}
.comments_wenzi {
  margin-top: 30px;
}
.comments_wenzi .clearfix:after {
  content: "\A0";
  display: block;
  visibility: hidden;
  width: 0;
  height: 0;
  clear: both;
  font-size: 0;
  line-height: 0;
  overflow: hidden;
}
.comments_wenzi .clearfix {
  zoom: 1;
}
.list {
  text-align: left;
}
.list .title {
  margin: 10px 0;
}
.list .userinfo {
  margin-right: 15px;
}
.comment {
  margin-bottom: 10px;
}
.list .comments {
  margin-bottom: 20px;
}
.list .comment-content {
  display: block;
}
.list .comment-info {
  float: right;
}
.toast[data-v-228146a4] {
  position: fixed;
  left: 50%;
  top: 50%;
  background: rgba(0, 0, 0, 0.7);
  padding: 10px;
  border-radius: 5px;
  -webkit-transform: translate3d(-50%, -50%, 0);
  transform: translate3d(-50%, -50%, 0);
  margin-top: -100px;
  color: #fff;
  z-index: 19;
}
.fadein[data-v-228146a4] {
  -webkit-animation: animate_in-data-v-228146a4 0.25s;
  animation: animate_in-data-v-228146a4 0.25s;
}
.fadeout[data-v-228146a4] {
  -webkit-animation: animate_out-data-v-228146a4 0.25s;
  animation: animate_out-data-v-228146a4 0.25s;
  opacity: 0;
}
@-webkit-keyframes animate_in-data-v-228146a4 {
  0% {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes animate_in-data-v-228146a4 {
  0% {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-webkit-keyframes animate_out-data-v-228146a4 {
  0% {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@keyframes animate_out-data-v-228146a4 {
  0% {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>