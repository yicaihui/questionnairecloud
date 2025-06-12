<template>
  <el-card style="max-width: 480px">
    <el-form label-width="auto" style="max-width: 600px">
      <el-form-item>
        <el-input v-model="password" placeholder="请输入新密码" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="repassword" placeholder="请再次输入新密码" />
      </el-form-item>
      <el-form-item>
        <el-button color="black" size="large" @click="submit_reset_password"
          >重置密码</el-button
        >
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import { ref } from "vue";
import api from "@/utils/api.js";
import { getCookie, setCookie, delCookie } from "../utils/cookie";
import { useRoute } from "vue-router";

const route = useRoute();

const password = ref("");
const repassword = ref("");

async function submit_reset_password() {
  if (password.value != repassword.value) {
    alert("两次密码不一致");
    return;
  }
  let res = await api.reset_password(route.params.token, password.value);
  alert(res.message);
}
</script>

<style>
</style>