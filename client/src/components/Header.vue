<template>
  <header class="header">
    <div class="title">
      <div class="logo">
        <img src="@/assets/cloud.png" alt="" width="100%" height="100%" />
      </div>
      <div class="title-name">问卷云</div>
    </div>
    <div class="menu">
      <div></div>
    </div>
    <div class="regis-login">
      <el-button
        @click="trans_page('register')"
        v-show="props.page_type == 'login' || props.page_type == 'home'"
        >注册</el-button
      >
      <el-button
        @click="trans_page('login')"
        v-show="props.page_type == 'register' || props.page_type == 'home'"
        >登录</el-button
      >
      <el-button
        color="black"
        @click="trans_page('home')"
        v-show="props.page_type == 'login' || props.page_type == 'register'"
        >返回主页</el-button
      >
      <el-button
        color="black"
        @click="trans_page('manage')"
        v-show="props.page_type == 'manage'"
        >进入后台管理</el-button
      >
    </div>
  </header>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
function trans_page(name) {
  router.push(name);
}
const props = defineProps({
  page_type: {
    type: String,
    default: "home",
  },
});
</script>

<style scoped lang="less">
.header {
  height: 80px;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title {
    display: flex;
    align-items: center;
    font-weight: 600;
  }
  .logo {
    width: 25px;
    height: 25px;
    margin-right: 8px;
  }
}
</style>
