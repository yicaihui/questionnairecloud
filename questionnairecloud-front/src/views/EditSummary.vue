
<template>
  <div class="outer">
    <div class="title">问卷结果统计</div>
    <div class="content">
      <div
        class="item"
        v-for="(item, index) in questionStore.componentLists"
        :key="item.id"
      >
        <el-card style="max-width: 1024px">
          <template #header>
            <div class="card-header">
              <span>{{ index + 1 }}--{{ item.props.title }}</span>
            </div>
          </template>
          <stat-components
            v-if="resultData[item.id]"
            :data="resultData[item.id]"
            :type="item.type"
            :lists="item.props.lists"
            :id="item.id"
          ></stat-components>
        </el-card>
      </div>
    </div>
  </div>
</template>
    
<script setup>
import { ref } from "vue";
import { useQuestionStore } from "../store/question";
import api from "../utils/api";
import { useRoute } from "vue-router";

let questionStore = useQuestionStore();
let route = useRoute();

let resultData = ref({});
async function get_summary_data(id) {
  let res = await api.stat_getdata(id);
  resultData.value = res.resultData;
}
get_summary_data(route.query.id);
</script>
    
<style scoped lang="less">
.outer {
  margin: 0 auto;
  width: 100vh;
  .title {
    width: 1024px;
    height: 112px;
    line-height: 112px;
    font-size: 24px;
  }
  .item {
    margin-bottom: 24px;
  }
}
</style>
    