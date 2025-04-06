<template>
  <div class="lists-content">
    <draggable
      :list="questions"
      chosen-class="chosen-class"
      animation="100"
      @change="onChange"
    >
      <template #item="{ element, index }">
        <div
          class="item"
          @click="change_selected(element)"
          :class="{
            'item-current': index == questionStore.selected_question_index,
          }"
        >
          <span>{{ index + 1 }} ：</span> {{ element.quTitle }}
        </div>
      </template>
    </draggable>
  </div>
</template>
    
<script setup>
import draggable from "vuedraggable";
import { useQuestionStore } from "@/store/question.js";
import { ref, watch } from "vue";

let questionStore = useQuestionStore();
function change_selected(question) {
  questionStore.change_selected(question);
}
const questions = ref([]);
watch(
  () => questionStore.survey.questions,
  (newVal) => {
    questions.value = newVal;
  }
);
const onChange = (e) => {
  console.log("顺序变化", e);
  console.log(questions.value);
  questionStore.change_selected(e.moved.newIndex);
};
</script>
    
<style scoped lang="less">
.lists-content {
  padding: 12px;
}
// ghost {
//   background: #e9e9e9 !important;
// }
.chosen-class {
  background-color: #e9e9e9;
}
.item {
  height: 48px;
  padding: 10px;
  border-radius: 10px;
}
.item-current {
  background-color: #e9e9e9;
}
</style>
    