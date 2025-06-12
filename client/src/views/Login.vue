<template>
  <div class="outer">
    <Header :showMenu="'login'"></Header>
    <div class="content">
      <div class="inner">
        <div class="login">
          <!-- 登录 -->
          <el-form
            :model="login_form"
            label-width="auto"
            style="max-width: 600px"
          >
            <el-form-item>
              <el-input v-model="login_form.email" placeholder="请输入邮箱" />
            </el-form-item>
            <el-form-item prop="pass">
              <el-input
                v-model="login_form.password"
                type="password"
                autocomplete="off"
                placeholder="请输入登陆密码"
              />
            </el-form-item>
            <div class="login_tool">
              <div @click="trans_page('forget-password')">忘记密码？</div>
              <el-checkbox
                v-model="is_remember"
                label="下次自动登录"
                size="small"
              />
            </div>
            <div class="login_tips" v-if="login_error">{{ login_error }}</div>
            <el-form-item>
              <el-button color="black" size="large" @click="submit_login"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
          <div @click="trans_page('register')">
            <span class="reg-btn">立即注册</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import api from "@/utils/api.js";
import { getCookie, setCookie, delCookie } from "../utils/cookie";
import Jsencrypt from "../utils/jsencrypt";

const router = useRouter();
function trans_page(name) {
  console.log("trans_page", name);
  router.push(name);
}
const login_form = reactive({
  email: "",
  password: "",
});
const is_remember = ref(false);

onMounted(() => {
  if (localStorage.getItem("remenberEmail")) {
    login_form.email = localStorage.getItem("remenberEmail");
    login_form.password = localStorage.getItem("remenberPassword");
  }
});
const login_error = ref("");
//登录注册系统使用了token+cookie结合的方式
//1. 发起登录请求后，携带用户名和密码
//2. 服务器收到后，会核对用户名和密码，如果一致，下发token，保存的是除了密码之外的信息
//3. 前端收到后，将token保存到cookie中
//4. 在下次请求时，通过请求拦截器，查看是否有token，有的话设置在req.headers上
async function submit_login() {
  let res = await api.login({
    email: login_form.email,
    password: login_form.password,
  });
  if (is_remember.value) {
    //下次自动登录
    localStorage.setItem("remenberEmail", login_form.email);
    localStorage.setItem("remenberPassword", login_form.password);
  } else {
    localStorage.removeItem("remenberEmail");
    localStorage.removeItem("remenberPassword");
  }
  if (res.code == 200) {
    alert("欢迎，" + res.userInfo.username);
    if (getCookie("token")) {
      delCookie("token");
    }
    setCookie("token", res.token);
    trans_page("home");
  } else {
    // alert("登录失败：" + res.message);
    login_error.value = res.data.message;
  }
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
      .login {
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
.login_tool {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
  font-size: 12px;
}
.login_tips {
  font-size: 12px;
  color: rgb(255, 0, 0);
  margin-bottom: 28px;
}
</style>