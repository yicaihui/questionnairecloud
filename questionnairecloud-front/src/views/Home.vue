<template>
  <div class="home">
    <Header :page_type="isLogin ? 'manage' : 'home'"></Header>
    <div class="content">
      <el-button
        type="primary"
        color="black"
        @click="go_page(isLogin ? 'manage' : 'login')"
      >
        <span class="start">点击开始</span> <el-icon><Right /></el-icon>
      </el-button>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getCookie } from "../utils/cookie";
import api from "../utils/api";
const router = useRouter();
function go_page(name) {
  router.push(name);
}
let isLogin = ref(false);
if (getCookie("token") && api.isExpire()) {
  isLogin.value = true;
}
</script>
<style scoped lang="less">
.content {
  position: absolute;
  top: 400px;
  left: 700px;
  .el-button--primary {
    width: 250px;
    height: 90px;
    border-radius: 30px;
    font-size: 35px;
  }
}
.start {
  margin-right: 5px;
}
</style>
  