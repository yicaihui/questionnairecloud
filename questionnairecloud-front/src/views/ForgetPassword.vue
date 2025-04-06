<template>
  <div class="outer">
    <Header :showMenu="'login'"></Header>
    <div class="content">
      <div class="inner">
        <div class="login-box" v-show="!send_ok_page">
          <!-- 找回密码 -->
          <el-form label-width="auto" style="max-width: 600px">
            <el-form-item>
              <el-input v-model="email" placeholder="请输入邮箱" />
            </el-form-item>
            <el-form-item>
              <el-button color="black" size="large" @click="send_emailcode"
                >发送至邮箱</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <div class="login-box" v-show="send_ok_page">
          <div class="tips" style="width: 300px">
            <h3>已发送，前往邮箱修改密码</h3>
            <el-button color="black" size="large" @click="trans_page('login')"
              >返回至登录页面</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "@/utils/api.js";

const router = useRouter();

function trans_page(name) {
  router.push(name);
}
const email = ref("");
const send_ok_page = ref(false);
async function send_emailcode() {
  //从邮箱发送连接
  await api.forget_password(email.value);
  //显示成功页面
  send_ok_page.value = true;
}
</script>
  
  <style scoped lang="less">
// display: flex;
.outer {
  height: 100%;
  .content {
    height: 90%;
    width: 100%;
    padding: 20px;
    .inner {
      background-color: #f7f7f6;
      height: 100%;
      .login-box {
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .el-form-item {
          width: 300px;
          height: 40px;
          .el-input {
            height: 100%;
          }
        }
        .el-button {
          width: 100%;
        }
        .reg-btn {
          border-bottom: 1px solid black;
        }
      }
    }
  }
}
</style>