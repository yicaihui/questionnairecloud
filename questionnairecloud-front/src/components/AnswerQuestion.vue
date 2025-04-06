<template>
  <div class="canvas">
    <template v-if="question.isFullScreen">
      <an-comp-full-canvas
        :question="question"
        :index="index"
      ></an-comp-full-canvas>
    </template>

    <!-- 多页面 -->
    <template v-else-if="question.isMultiPage">
      <an-comp-multiPage
        :question="question"
        :index="index"
      ></an-comp-multiPage>
    </template>

    <!-- 单页面 -->
    <template v-else>
      <an-comp-title-canvas
        :question="question"
        :index="index"
      ></an-comp-title-canvas>
    </template>
  </div>
</template>
    
<script setup>
defineProps(["question", "index"]);
</script>
    
<style scoped lang="less">
</style>