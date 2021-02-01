<template>
  <div id="div_login">
    <div class="div_title"><h1>用户登陆</h1></div>
    <div class="midden">
      <p>
        <input
          class="inputinfo"
          type="text"
          name="UserName"
          v-model="username"
          placeholder="请输入用户名"
        />
      </p>
      <p>
        <input
          class="inputinfo"
          type="password"
          name="PassWord"
          v-model="password"
          placeholder="请输入密码"
        />
      </p>
      <button
        @click="doLogin"
        data-v-731308b2=""
        data-v-67070f71=""
        class="i-btn"
      >
        <span data-v-731308b2="">登录</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    doLogin() {
      this.$http
        .post("/users/login", {
          username: this.username,
          password: this.password,
        })
        .then((res) => {
          console.log(res);
          let { status,payload } = res.data;
          if (status == "success") {
            this.$store.dispatch("setUserId", payload);
            this.$router.push("/pusharticle");
          } else {
            alert("用户名或密码错误");
          }
        });
    },
  },
};
</script>

<style lang="scss">
.div_title {
  margin-top: 200px;
}
.midden {
  width: 500px;
  margin: 0 auto;
  .inputinfo {
    width: 100%;
    height: 35px;
    border: none;
    border-bottom: 1px solid steelblue;
  }
  .i-btn {
    float: right;
    margin-top: 10px;
  }
}
</style>