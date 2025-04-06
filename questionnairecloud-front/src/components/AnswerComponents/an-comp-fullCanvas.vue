<template>
  <div class="outer">
    {{ text }}
  </div>
</template>
  
  <script setup>
import { useQuestionStore } from "@/store/question.js";
import { ref } from "vue";

let questionStore = useQuestionStore();
const props = defineProps(["question"]);

const text = ref(props.question.quTitle);
function change_question() {
  questionStore.update_question({
    title: text.value,
  });
}
</script>
  
<style scoped lang="less">
.outer {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
input {
  width: 100%;
  font-size: 24px;
  text-align: center; /* 文字居中 */
  color: black;
  border: none;
  outline: none;
}
</style>