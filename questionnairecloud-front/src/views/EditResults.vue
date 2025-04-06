
<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="概述" name="insights"></el-tab-pane>
    <el-tab-pane label="统计" name="summary"></el-tab-pane>
  </el-tabs>
  <div class="content">
    <router-view></router-view>
  </div>
</template>
  
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import { useRoute } from "vue-router";

let router = useRouter();
let route = useRoute();

let activeName = ref("insights");
function handleClick(tab) {
  router.push({
    path: "/edit/results/" + tab.paneName,
    query: { id: route.query.id },
  });
}
</script>
  
<style scoped lang="less">
.demo-tabs {
  height: 56px;
}
.content {
  background-color: #f7f7f6;
  position: absolute;
  top: 56px;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0 30px;
  overflow: auto;
}
</style>
  