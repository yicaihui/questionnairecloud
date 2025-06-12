<template>
  <div class="outer">
    <div class="choices">
      <div class="choice" v-for="(option, index) in lists" :key="index">
        <div class="idx">-</div>
        <el-input
          v-model="option.optionTitle"
          :autosize="{
            minRows: 1,
          }"
          type="textarea"
          @input="change_optionTitle()"
        ></el-input>
      </div>
    </div>
    <div class="command" @click="addQuestionOptions">添加新选项</div>
  </div>
</template>
      
  <script setup>
import { toRefs } from "vue";
import { useQuestionStore } from "@/store/question.js";

let questionStore = useQuestionStore();

const props = defineProps(["lists"]);
let { lists } = toRefs(props);
function change_optionTitle() {
  questionStore.update_question({ quCheckboxs: lists.value });
}
function addQuestionOptions() {
  lists.value.push({ optionTitle: "" });
  change_optionTitle();
}
</script>
      
  <style scoped lang="less">
.idx {
  width: 22px;
  height: 22px;
  margin: 4px 8px;
  text-align: center;
  background-color: #fff;
  border: 1px solid rgba(4, 69, 175, 0.6);
  border-radius: 2px;
}
.choice {
  display: flex;
  background-color: rgba(4, 69, 175, 0.1);
  border-radius: 4px;
  border: 1px solid rgb(4, 69, 175);
  color: rgb(4, 69, 175);
  textarea {
    background-color: transparent !important;
  }
  margin-bottom: 8px;
}
</style>