<template>
  <div class="answer">
    <div class="answer_question">
      <answer-question
        :question="survey.questions[questionIndex]"
        :index="questionIndex"
      ></answer-question>
    </div>
    <div class="answer_btn">
      <el-button-group>
        <el-button type="primary" :icon="ArrowUpBold"></el-button>
        <el-button
          type="primary"
          :icon="ArrowDownBold"
          @click="next_question"
        ></el-button>
      </el-button-group>
    </div>
  </div>
</template>
  
<script setup>
import { ref } from "vue";
import { ArrowUpBold, ArrowDownBold } from "@element-plus/icons-vue";

const props = defineProps(["survey"]);

//显示的索引
const questionIndex = ref(0);
//下一个问题
function next_question() {
  checkQuLogics();
}
function checkQuLogics() {
  let question = props.survey.questions[questionIndex.value];
  let quLogics = question.quLogics;
  console.log(question.quAnswer);
  for (let i = 0; i < quLogics.length; i++) {
    let lo = quLogics[i];
    if (lo.logicType == "GO" && question.quAnswer.length != 0) {
      //跳转并且已回答
    }
  }
}
</script>
  
<style scoped lang="less">
.answer {
  width: 100%;
  height: 100%;
  position: relative;
  .answer_btn {
    position: absolute;
    bottom: 30px;
    right: 30px;
  }
}
.answer_question {
  width: 740px;
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
  scrollbar-gutter: stable;
  margin: 0 auto;
  padding-top: 30px;
}
</style>