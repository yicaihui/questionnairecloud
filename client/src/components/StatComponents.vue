<template>
  <div class="stat-components">
    <!-- 联系方式 -->
    <div class="box1" v-if="props.type == 'email'">
      <div class="item" v-for="(item, index) in props.data" :key="index">
        {{ item }}
      </div>
    </div>
    <!-- 邮箱 -->
    <div class="box1" v-if="props.type == 'contactinfo'">
      <div class="item" v-for="(item, index) in props.data" :key="index">
        <div v-for="li in lists" :key="li.value">
          {{ li.label }} : {{ item[li.value] }}
        </div>
      </div>
    </div>
    <!-- 柱状图 -->
    <div
      v-if="props.type == 'dropdown' || props.type == 'mutiplechoice'"
      class="myEcharts"
      :id="props.id"
    ></div>
  </div>
</template>
        
<script setup>
import * as echarts from "echarts";
import { onMounted } from "vue";

const props = defineProps(["data", "type", "lists", "id"]);

function init_echarts() {
  let canvasRef = document.getElementById(props.id);
  let myChart = echarts.init(canvasRef);
  let option = {
    xAxis: {
      type: "value",
      boundaryGap: [0, 0.01],
    },
    yAxis: {
      type: "category",
      data: props.lists,
    },
    series: [
      {
        type: "bar",
        data: props.lists.map((key) => (props.data ? props.data[key] : "")),
      },
    ],
  };
  option && myChart.setOption(option);
}
onMounted(() => {
  if (props.type == "dropdown" || props.type == "mutiplechoice") {
    init_echarts();
  }
});
</script>
        
<style scoped lang="less">
.stat-components {
  width: 856px;
}
.box1 {
  height: 200px;
  overflow: auto;
  .item {
    padding: 20px 24px;
    border-bottom: 1px solid #f7f7f6;
  }
}
.myEcharts {
  width: 830px;
  height: 200px;
}
</style>
        