<template>
  <div class="preview">
    <div class="preview_body">
      <!-- pc -->
      <div class="pc" v-show="previewTypeClass == 'preview-pc'">
        <answer-canvas
          :survey="survey"
          @change_answer="change_answer"
        ></answer-canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import { provide, reactive } from "vue";
import { useQuestionStore } from "../store/question";
import AnswerCanvas from "./AnswerCanvas.vue";

const questionStore = useQuestionStore();
const survey = reactive(JSON.parse(JSON.stringify(questionStore.survey)));
function change_answer(index, id, answer) {
  let question = survey.questions[index];
  let quAnswer = question.quAnswer;
  if (quAnswer.length != 0) {
    for (let i = 0; i < quAnswer.length; i++) {
      if (quAnswer[i].quId == id) {
        quAnswer[i].answer = answer;
        return;
      }
    }
  }
  quAnswer.push({ quId: id, answer });
}
provide("change_answer", change_answer);
//pc端-手机端
const previewTypeClass = "preview-pc";
</script>
  
<style scoped lang="less">
.preview_body {
  display: flex;
  justify-content: center;
}
.pc {
  width: 1024px;
  height: 576px;
  border: 2px solid #f7f7f6;
}
</style>
  