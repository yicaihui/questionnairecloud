<template>
  <div class="choices">
    <div class="choice" v-for="(option, index) in lists" :key="index">
      <div class="idx">{{ index + 1 }}</div>
      <div class="title">{{ option.optionTitle }}</div>
    </div>
  </div>
</template>
      
  <script setup>
import { toRefs } from "vue";
import { useQuestionStore } from "@/store/question.js";

let questionStore = useQuestionStore();

const props = defineProps(["lists"]);
let { lists } = toRefs(props);

function change_optionTitle() {
  questionStore.update_question({ quRadios: lists.value });
}
function add_radio() {
  lists.value.push({ optionTitle: "" });
  change_optionTitle();
}
</script>
      

<style scoped lang="less" >
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
  .title {
    line-height: 32px;
  }
  margin-bottom: 8px;
}
</style>
