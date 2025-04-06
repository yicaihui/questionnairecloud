<template>
  <div class="outer">
    <div class="item" v-for="n in 11" :key="n">{{ n - 1 }}</div>
  </div>
</template>
      
  <script setup>
</script>
      
  <style scoped lang="less">
.outer {
  display: flex;
  justify-content: space-between;
  .item {
    width: 60px;
    height: 60px;
    background-color: rgba(4, 69, 175, 0.1);
    border: 1px solid rgb(4, 69, 175);
    border-radius: 4px;
    text-align: center;
    line-height: 60px;
    color: rgb(4, 69, 175);
    font-size: 16px;
  }
}
</style>