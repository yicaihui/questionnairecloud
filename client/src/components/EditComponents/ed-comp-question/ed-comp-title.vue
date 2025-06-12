<template>
  <div class="outer">
    <div class="index">
      {{ questionStore.selected_question_index + 1
      }}<el-icon><Right /></el-icon>
    </div>
    <div class="title">
      <input
        v-model="title"
        @blur="change_question"
        placeholder="填写你的问题"
      />
    </div>
    <div class="description">
      <input
        v-model="note"
        @blur="change_question"
        placeholder="填写你对问题的描述（可选）"
      />
    </div>
  </div>
</template>
            
<script setup>
import { useQuestionStore } from "@/store/question.js";
import { computed, ref, watch } from "vue";

let questionStore = useQuestionStore();

let title = ref("");
let note = ref("");
watch(
  () => questionStore.selected_question_index,
  () => {
    let question =
      questionStore.survey.questions[questionStore.selected_question_index];
    title.value = question.quTitle;
    note.value = question.quNote;
  }
);

//blur事件
function change_question() {
  questionStore.update_question({
    title: title.value,
    note: note.value,
  });
}
</script>
            
<style scoped lang="less">
.outer {
  position: relative;
}
.index {
  position: absolute;
  left: -30px;
  top: 3px;
  display: flex;
  align-items: center;
}
input {
  border: none;
  outline: none;
  width: 100%;
}
.title {
  margin-bottom: 8px;
  width: 700px;
  height: 32px;
  input {
    font-size: 24px;
  }
  input::placeholder {
    color: black;
  }
}
.description {
  margin-bottom: 32px;
  width: 700px;
  height: 28px;
  input {
    font-size: 20px;
    color: rgba(0, 0, 0, 0.7);
  }
}
</style>
            