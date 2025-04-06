<template>
  <div class="title">
    <div class="title_index">
      {{ index + 1 }}<el-icon><Right /></el-icon>
    </div>
    <div class="title_text">
      <div class="text_t">{{ question.quTitle }}</div>
      <div class="text_n">{{ question.quNote }}</div>
    </div>
  </div>
</template>
            
<script setup>
import { computed, ref, watch } from "vue";

defineProps(["question", "index"]);
</script>
            
<style scoped lang="less">
.title {
  position: relative;
}
.title_index {
  position: absolute;
  left: -30px;
  top: 3px;
  display: flex;
  align-items: center;
}
.text_t {
  margin-bottom: 8px;
  width: 700px;
  height: 32px;
  font-size: 24px;
}
.text_n {
  margin-bottom: 32px;
  width: 700px;
  height: 28px;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.7);
}
</style>
            