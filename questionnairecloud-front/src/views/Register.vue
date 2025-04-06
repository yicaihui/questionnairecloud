<template>
  <div class="outer">
    <Header :showMenu="'register'"></Header>
    <div class="content">
      <div class="inner">
        <div class="login-box">
          <el-form
            :model="register_form"
            label-width="auto"
            style="max-width: 600px"
            :rules="rules"
            ref="registerRef"
          >
            <el-form-item prop="email">
              <el-input
                v-model="register_form.email"
                placeholder="请输入邮箱"
              />
            </el-form-item>
            <el-form-item prop="username">
              <el-input
                v-model="register_form.username"
                placeholder="请输入用户名"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="register_form.password"
                type="password"
                autocomplete="off"
                placeholder="设置密码"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                color="black"
                @click="submit_register(registerRef)"
                size="large"
                :disabled="isRegisterLoading"
                >立即注册</el-button
              >
            </el-form-item>
          </el-form>
          <div>
            已有账号？<span class="reg-btn" @click="trans_page('login')"
              >立即登录</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import api from "@/utils/api.js";
import Jsencrypt from "../utils/jsencrypt";

const router = useRouter();
function trans_page(name) {
  router.push(name);
}
const register_form = reactive({
  username: "",
  password: "",
  email: "",
});
//表单验证
const checkUserName = (rule, value, callback) => {
  if (value.trim() === "") {
    callback(new Error("姓名不可为空"));
  } else {
    return callback();
  }
};
const registerRef = ref(null);
const checkEmail = (rule, value, callback) => {
  const regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  if (value === "") {
    callback(new Error("邮箱不可为空"));
  } else if (regEmail.test(value)) {
    return callback();
  }
  callback(new Error("请输入合法的邮箱"));
};
const rules = {
  username: [
    { require: true, message: "请输入用户名", trigger: "blur" },
    {
      min: 3,
      max: 20,
      message: "用户名为3~20位非空字符",
      trigger: "blur",
    },
    {
      validator: checkUserName,
      trigger: "blur",
    },
  ],
  email: [
    { require: true, message: "请输入邮箱", trigger: "blur" },
    {
      min: 3,
      max: 20,
      message: "邮箱为3~20位非空字符",
      trigger: "blur",
    },
    {
      validator: checkEmail,
      trigger: "blur",
    },
  ],
  password: [
    { require: true, message: "请输入密码", trigger: "blur" },
    {
      min: 3,
      max: 20,
      message: "密码为8~20位非空字符",
      trigger: "blur",
    },
  ],
};
//立即注册
const isRegisterLoading = ref(false);
async function submit_register(registerRef) {
  await registerRef.validate((valid, fields) => {
    if (!valid) {
      alert("error submit!", fields);
      return;
    }
  });
  isRegisterLoading.value = true;
  let res = await api.register({
    username: register_form.username,
    password: register_form.password,
    email: register_form.email,
  });
  // console.log(passwordRsa);
  if (res.code == 200) {
    trans_page("login");
  } else {
    alert("注册出现错误：" + res.message);
  }
  isRegisterLoading.value = false;
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