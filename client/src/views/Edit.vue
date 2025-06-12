<template>
  <manage-header page_type="edit"></manage-header>
  <div class="content">
    <router-view></router-view>
  </div>
</template>
      
<script setup>
import { useRoute } from "vue-router";
import api from "../utils/api";
import { useQuestionStore } from "@/store/question.js";

let route = useRoute();
let questionStore = useQuestionStore();

async function get_survey_detail(id) {
  if (id) {
    let res = await api.detail_survey_get(id);
    questionStore.change_surveyInfo(res.data);
  }
}
get_survey_detail(route.query.id);
</script>
      
<style scoped lang="less">
.content {
  position: absolute;
  top: 56px;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 30px 30px;
}
</style>
      