<template>
  <div class="logic_dialog">
    <div class="logic_question" v-for="(qu, index) in questions" :key="index">
      <div class="logic_question_header">
        {{ index + 1 }} - {{ qu.quTitle }}
      </div>
      <div class="line-separator"><div class="line"></div></div>
      <div class="logic_question_body">
        <div class="body_logics">
          <div class="body_logics_item" v-for="lo in qu.quLogics" :key="lo.id">
            <div class="item_if">
              <template v-if="qu.quType == 'contactInfo'">
                <span class="item_if_text">如果本题被回答</span>
              </template>
              <template v-else>
                <span class="item_if_text">如果本题选项</span>
                <div class="item_if_select">
                  <el-select
                    v-model="lo.stQuOptionId"
                    placeholder="请选择本题选项"
                    style="width: 656px"
                    size="mini"
                    :multiple="qu.quType == 'multipleChoice'"
                  >
                    <el-option
                      v-for="option in qu.quCheckboxs"
                      :key="option.id"
                      :value="option.id"
                      :label="option.optionTitle"
                    ></el-option>
                  </el-select>
                </div>
              </template>
            </div>
            <div class="item_then">
              <span class="item_then_text">那么</span>
              <div class="item_then_select">
                <el-select
                  v-model="lo.logicType"
                  style="width: 85px"
                  size="mini"
                >
                  <el-option value="GO" label="跳转"></el-option>
                  <el-option value="SHOW" label="显示"></el-option>
                </el-select>
                <el-select
                  v-model="lo.enQuId"
                  placeholder="请选择题目"
                  style="width: 536px"
                  size="mini"
                  :multiple="lo.logicType === 'SHOW'"
                >
                  <el-option
                    v-for="qu2 in questions.filter((qu, idx) => {
                      qu.index = idx;
                      return idx > index;
                    })"
                    :key="qu2.id"
                    :value="qu2.id"
                    :label="qu2.index + 1 + '-' + qu2.quTitle"
                  ></el-option>
                </el-select>
              </div>
            </div>
          </div>
        </div>
        <el-button
          color="#f7f7f6"
          :icon="Plus"
          @click="add_logic(qu)"
          class="body_addbtn"
          >添加逻辑</el-button
        >
      </div>
    </div>
  </div>
</template>
    
<script setup>
import { useQuestionStore } from "@/store/question.js";
import { computed } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { nanoid } from "nanoid";

let questionStore = useQuestionStore();

const questions = computed(() => {
  return questionStore.survey.questions;
});

function add_logic(qu) {
  qu.quLogics.push({
    id: nanoid(),
    stQuOptionId: null,
    enQuId: null,
    logicType: "GO",
  });
}
</script>
    
<style scoped lang="less">
.logic_dialog {
  height: 656px;
  overflow: auto;
  padding: 32px;
  padding-right: 16px;
  padding-top: 0;
  .logic_question {
    background-color: #f7f7f6;
    border-radius: 10px;
    margin-bottom: 32px;
    .logic_question_header {
      height: 44px;
      padding: 16px;
    }
    .logic_question_body {
      padding: 0 0 24px 28px;
      padding-top: 0;
      .body_addbtn {
        font-size: 13px;
        padding: 0;
      }
      .item_if,
      .item_then {
        padding-right: 88px;
        display: flex;
        justify-content: space-between;
      }
      .item_if {
        margin-bottom: 24px;
      }
      .item_if_text,
      .item_then_text {
        display: inline-block;
        width: 104px;
        height: 32px;
        color: black;
        font-size: 14px;
        font-weight: 600;
        line-height: 32px;
      }
      .item_if_select,
      .item_then_select {
        width: 656px;
      }
      .item_then_select {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
.line-separator {
  padding: 12px 0;
  .line {
    height: 2px;
    background-color: #fff;
  }
}
</style>
    