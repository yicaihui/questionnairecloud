<template>
  <div class="text">
    <span v-if="!isVerify">正在验证</span>
    <span v-else>验证成功</span>
  </div>
</template>
  
<script setup>
import { ref } from "vue";
import api from "../utils/api";
import { useRoute } from "vue-router";

const route = useRoute();

const isVerify = ref(false);
api.verify_email({ token: route.params.token }).then(() => {
  isVerify.value = true;
});
</script>
  
  <style>
</style>