<template>
  <div class="outer">
    <el-slider v-model="value5" disabled />
  </div>
</template>
        
    <script setup>
</script>
        
<style scoped lang="less">
.outer {
  width: 650px;
  display: flex;
  justify-content: center;
  .el-slider {
    flex: 0 0 90%;
  }
}
</style>