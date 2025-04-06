<template>
  <div class="logic">
    <div class="logic_header">
      <el-button color="#fff" :icon="Plus" @click="dialogLogicVisible = true"
        >添加跳转逻辑</el-button
      >
      <el-dialog
        v-model="dialogLogicVisible"
        title="跳转逻辑"
        width="960"
        top="8vh"
      >
        <edit-logic-dialog></edit-logic-dialog>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogVisible = false">删除所有逻辑</el-button>
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="save_questions"> 保存 </el-button>
          </div>
        </template>
      </el-dialog>
      <div class="border"></div>
      <el-tooltip
        class="box-item"
        effect="dark"
        content="预览"
        placement="bottom"
      >
        <el-button
          class="small-btn"
          color="#f7f7f6"
          :icon="VideoPlay"
          @click="previewDialogVisible = true"
        />
      </el-tooltip>
      <el-dialog
        v-model="previewDialogVisible"
        width="100%"
        :show-close="false"
        :style="{ height: '100%', margin: 0 }"
      >
        <template #header>
          <div class="header">
            <el-button-group class="ml-4">
              <el-button
                type="primary"
                :icon="Close"
                @click="previewDialogVisible = false"
              />
              <el-button type="primary" :icon="Monitor" />
              <el-button type="primary" :icon="Refresh" />
            </el-button-group>
          </div>
        </template>
        <preview-body></preview-body>
      </el-dialog>
    </div>
    <div class="logic_flow">
      <VueFlow :nodes="nodes" :edges="edges" fit-view-on-init>
        <Controls />
      </VueFlow>
    </div>
  </div>
</template>
  
<script setup>
import {
  VueFlow,
  Position,
  Panel,
  useVueFlow,
  MarkerType,
} from "@vue-flow/core";
import { Controls } from "@vue-flow/controls";
import { VideoPlay, Close, Monitor, Refresh } from "@element-plus/icons-vue";
import { computed, ref } from "vue";
import { useQuestionStore } from "@/store/question.js";
import api from "../utils/api";
import PreviewBody from "../components/PreviewBody.vue";

let questionStore = useQuestionStore();

const nodes = computed(() => {
  let questions = questionStore.survey.questions;
  if (!questions) return [];
  return questions.map((que, index) => {
    return {
      id: que.id,
      type: "custom",
      label: `${index + 1}-${que.quLabel}`,
      position: { x: 100 + 200 * index, y: 200 },
    };
  });
});

const edges = computed(() => {
  let arr = [];
  for (let i = 0; i < nodes.value.length - 1; i++) {
    arr.push({
      id: nodes.value[i].id + nodes.value[i + 1].id,
      source: nodes.value[i].id,
      target: nodes.value[i + 1].id,
      type: "custom",
    });
  }
  for (let i = 0; i < questionStore.survey.questions.length; i++) {
    let question = questionStore.survey.questions[i];
    for (let j = 0; j < question.quLogics.length; j++) {
      let logic = question.quLogics[j];
      if (logic.logicType == "GO") {
        arr.push({
          id: question.id + logic.enQuId,
          source: question.id,
          target: logic.enQuId,
          type: "custom",
        });
      }
    }
  }
  return arr;
});
//添加跳转逻辑
const dialogLogicVisible = ref(false);
async function save_questions() {
  dialogLogicVisible.value = false;
  let res = await api.question_update(questionStore.survey_id, {
    title: questionStore.survey.title,
    questions: JSON.stringify(questionStore.survey.questions),
  });
}
//预览
const previewDialogVisible = ref(false);
</script>
  
<style scoped lang="less">
.logic {
  height: 812px;
  display: flex;
  flex-direction: column;
  .logic_header {
    height: 48px;
    margin-bottom: 16px;
    padding: 8px;
    background-color: #f7f7f6;
    display: flex;
    align-items: center;
  }
  .logic_flow {
    flex: 1;
    background-color: #f7f7f6;
  }
}
.border {
  width: 1px;
  height: 16px;
  background-color: rgb(185, 185, 185);
  margin: 0 8px;
}
.header {
  display: flex;
  justify-content: center;
}
</style>
  