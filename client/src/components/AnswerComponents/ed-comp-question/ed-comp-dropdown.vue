<template>
  <div class="item" @click="dialogVisible = true" v-if="disabled">
    <span>添加选项</span><el-icon><ArrowDown /></el-icon>
  </div>

  <el-dialog
    v-model="dialogVisible"
    title="编辑选项"
    append-to-body
    width="550"
  >
    <el-input
      v-model="textValue"
      style="width: 512px; padding: 5px 11px"
      :autosize="{ minRows: 15, maxRows: 15 }"
      type="textarea"
    ></el-input>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="change_lists"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
    
<script setup>
import { ref, toRefs, watch } from "vue";
import { useQuestionStore } from "@/store/question.js";

const props = defineProps({
  lists: {
    type: Array,
    default: [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
let questionStore = useQuestionStore();

const { lists } = toRefs(props);
const dialogVisible = ref(false);
const textValue = ref(lists.value.map((op) => op.optionTitle).join("\n"));
function change_lists() {
  dialogVisible.value = false;
  const quRadios = textValue.value.split("\n").map((op) => {
    return { optionTitle: op };
  });
  questionStore.update_question({ quRadios });
}
</script>
    
  <style scoped lang="less">
.item {
  width: 100%;
  margin-bottom: 48px;
  border-bottom: 1px solid #b3c7e7;
  color: #b3c7e7;
  font-size: 24px;
  padding-bottom: 8px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  .el-icon {
    color: rgb(68, 68, 68);
  }
}
</style>