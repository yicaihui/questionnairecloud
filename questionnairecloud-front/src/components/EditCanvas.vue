<template>
  <div class="canvas">
    <template v-if="question.isFullScreen">
      <ed-comp-full-canvas :question="question"></ed-comp-full-canvas>
    </template>

    <!-- 多页面 -->
    <template v-else-if="question.isMultiPage">
      <ed-comp-multiPage :question="question"></ed-comp-multiPage>
    </template>

    <!-- 单页面 -->
    <template v-else>
      <ed-comp-title-canvas :question="question"></ed-comp-title-canvas>
    </template>
  </div>
</template>
  
<script setup>
import EdCompFullCanvas from "./EditComponents/ed-comp-fullCanvas.vue";
import EdCompMultiPage from "./EditComponents/ed-comp-multiPage.vue";
import { useQuestionStore } from "@/store/question.js";
import { computed } from "vue";

let questionStore = useQuestionStore();

let question = computed(() => {
  if (questionStore.selected_question_index == -1) {
    return {};
  }
  return questionStore.survey.questions[questionStore.selected_question_index];
});
</script>
  
<style scoped lang="less">
.canvas {
  width: 740px;
  height: 100%;
  overflow-y: auto;
  scrollbar-gutter: stable;
  margin: 0 auto;
  padding-top: 30px;
}
</style>
  