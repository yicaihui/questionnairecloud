<template>
  <div class="outer">
    <div class="choices">
      <draggable
        :list="lists"
        chosen-class="chosen-class"
        animation="100"
        @change="change_lists"
      >
        <template #item="{ element, index }">
          <div class="choice">
            <div class="idx">{{ index + 1 }}</div>
            <el-input
              v-model="element.optionTitle"
              :autosize="{
                minRows: 1,
              }"
              type="textarea"
              @input="change_lists()"
            ></el-input>
          </div>
        </template>
      </draggable>
    </div>
    <div class="command" @click="addQuestionOptions">添加新选项</div>
  </div>
</template>
      
<script setup>
import draggable from "vuedraggable";
import { watch, ref } from "vue";
import { useQuestionStore } from "@/store/question.js";
import { nanoid } from "nanoid";

let questionStore = useQuestionStore();

const props = defineProps(["lists"]);
const lists = ref(props.lists);
watch(
  () => props.lists,
  (newVal) => {
    lists.value = newVal;
  }
);

function addQuestionOptions() {
  lists.value.push({ optionTitle: "", id: nanoid() });
  change_lists();
}
function change_lists() {
  questionStore.update_question({ quCheckboxs: lists.value });
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