<template>
  <body>
    <a name="top" id="top"></a>
    <header>
      <div class="content clearfix">
        <a class="logo" href="">MoonLight</a>
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
      <div class="content">
        <div class="main">
          <div class="list" v-for="item in blogList" :key="item.blog_id">
            <article>
              <h2>
                <router-link
                  class="title"
                  :to="{ path: '/blog/detail/' + item.blog_id }"
                  >{{ item.title }}</router-link
                >
              </h2>
              <h4 class="description">
                <router-link :to="{ path: '/blog/detail/' + item.blog_id }">
                  {{ item.content }}</router-link
                >
              </h4>
              <h5 class="date">
                <span>posted @</span
                ><time pubdate="2021-01-28">{{ item.post_time }}</time
                ><span class="comment">{{ item.comment }}</span>
              </h5>
            </article>
          </div>
          <div class="page">
            <span title="当前为第1页">1</span>
            <a href="#" title="第2页">2</a><a href="#" title="第3页">3</a
            ><a href="#" title="第4页">4</a><a href="#" title="第5页">5</a>..
            <a href="#" title="第2页" class="next">下一页</a
            ><a href="#" class="next" title="第11页">末页</a>
          </div>
        </div>
        <aside class="aside">
          <div class="about">
            <h4 class="v-section-tit">About MoonLight</h4>
            <article class="violet-about-det">
              <!-- <p class="my-face"><img src="/data/img/avatar.png" alt="Hello wenzi!" width="40px" height="40px" id="J_myFace_img" /></p> -->
              <p>Front-end Engineer，MoonLight</p>
              <p>世事千帆过 前方终会是温柔和月光。</p>
              <p></p>
              <p></p>
            </article>
            <p class="v-more-right"></p>
          </div>
          <div class="friendly">
            <h4 class="v-section-tit">My Links</h4>
            <article class="attent-det">
              <ul>
                <li>
                  <a
                    href="https://github.com/669001664"
                    target="_blank"
                    title="my github"
                    ><span>GitHub</span></a
                  >
                </li>
              </ul>
            </article>
          </div>
        </aside>
      </div>
      <!-- content -->
    </div>
    <!-- /container -->
  </body>
</template>

<script>
export default {
  data() {
    return {
      blogList: [],
    };
  },
  created() {
    this.getBlogData();
  },
  methods: {
    getBlogData() {
      this.$http.get("/blog/index").then((res) => {
        console.log(res);
        let { state } = res.data;
        if (state == "fail") {
          alert("获取失败");
        } else if (state == "success") {
          let { blogs } = res.data;
          this.blogList = blogs;
        }
      });
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
  width: 1080px;
  margin: 0 auto;
  // zoom: 1;
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
/*! @2020-9-6 12:07:14 */
.container .content {
  display: flex;
  justify-content: space-between;
}
.main {
  width: 71%;
}
.main .list article {
  line-height: 1.8em;
  margin-bottom: 50px;
}
.main .list h2 {
  font-weight: 400;
}
.main .list h2 .title {
  font-size: 22px;
  color: #3e3b3f;
  position: relative;
  box-shadow: 0 0 1px transparent;
}
.main .list .description {
  line-height: 25px;
  font-size: 14px;
  color: #666;
}
.main .list .more {
  font-size: 12px;
  color: #3e3b3f;
}
.main .list .date {
  text-align: right;
  margin-left: 60px;
  font-size: 13px;
  line-height: 12px;
  color: #666;
}
.aside {
  width: 27%;
  float: right;
  color: #514951;
}
.aside .v-section-tit {
  font-size: 18px;
  line-height: 30px;
  font-weight: 500;
  padding: 0 5px;
  color: #3e3b3f;
  border-bottom: 1px solid #dedede;
  margin-bottom: 6px;
  margin-top: 20px;
}
.aside .about p {
  line-height: 1.6;
  margin-bottom: 10px;
  font-size: 14px;
}
.page {
  text-align: center;
}
.page a,
.page span {
  border: 1px solid #ccc;
  width: 35px;
  height: 35px;
  display: inline-block;
  text-align: center;
  line-height: 35px;
  border-radius: 50%;
  margin: 0 2px;
}
.page span {
  background: #ececec;
  cursor: default;
}
.page .next,
.page .prev {
  width: auto;
  padding: 0 6px;
  border-radius: 4px;
}
</style>