<template>
  <div class="login">
    <div class="from">
      <h2 class="title">登录</h2>
      <input type="text" v-model="fromData.username" class="input" placeholder="请输入账号" />
      <div style="position: relative">
        <input
          :type="isPassword ? 'text' : 'password'"
          v-model="fromData.password"
          class="input"
          maxlength="15"
          minlength="6"
          style="padding: 0 30px 0 15px"
          placeholder="请输入密码"
        />
        <Icon class="isPassword" @click="isPassword = !isPassword" :name="isPassword ? 'View' : 'Hide'" />
      </div>
      <el-divider style="top: 10px"> <span style="color: rgb(205, 209, 212)">欢迎使用本系统</span> </el-divider>
      <el-button class="submit" type="primary">登录</el-button>
    </div>
    <div class="model"></div>
  </div>
</template>

<script setup>
const isPassword = ref(false);
const fromData = reactive({
  username: "",
  password: ""
});
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background-image: url("@/assets/login.webp");
  background-size: cover;
  background-repeat: no-repeat;
  .from {
    width: 350px;
    padding: 10px 20px;
    background-color: #fff;
    border-radius: 20px;
    position: absolute;
    top: 20%;
    left: calc(50% - 175px);
    z-index: 3;
    box-sizing: border-box;
    .title {
      text-align: center;
      margin: 12px 0;
    }
    .input {
      outline: none;
      border-style: none;
      border-radius: 0.75rem;
      padding: 0 15px;
      width: 100%;
      height: 44px;
      background-color: rgb(243 244 246);
      box-sizing: border-box;
      margin-top: 25px;
      box-shadow:
        0 0 #0000,
        0 0 #0000,
        0 0 #0000,
        0 0 #0000,
        0 10px 15px -3px rgb(0 0 0 / 0.1),
        0 4px 6px -4px rgb(0 0 0 / 0.1);
      font-family: inherit;
      font-feature-settings: inherit;
      font-variation-settings: inherit;
      font-size: 100%;
      font-weight: inherit;
      line-height: inherit;
      color: inherit;
    }
    .isPassword {
      position: absolute;
      right: 10px;
      top: 55%;
    }
    .submit {
      width: 100%;
      height: 44px;
      border-radius: 15px;
      margin: 20px 0 30px 0;
    }
  }
  .model {
    position: absolute;
    top: 20%;
    left: calc(50% - 175px);
    width: 350px;
    height: 357px;
    background-color: red;
    z-index: 2;
    border-radius: 20px;
    transform: rotate(8deg);
  }
  .model::after {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background-color: rgb(255, 217, 0);
    border-radius: 20px;
    transform: rotate(339deg);
  }
}
</style>
