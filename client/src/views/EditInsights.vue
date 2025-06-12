<template>
  <div class="outer">
    <div class="time">
      <el-date-picker
        v-model="value2"
        type="daterange"
        unlink-panels
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
        :shortcuts="shortcuts"
      />
    </div>
    <div class="data">
      <div class="title">数据概述</div>
      <div class="data-content">
        <div class="item">查看人数：</div>
        <div class="item">提交人数：</div>
        <div class="item">完成率：</div>
        <div class="item">完成的平均时间：</div>
      </div>
    </div>
  </div>
</template>
    
<script setup>
const shortcuts = [
  {
    text: "Last week",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    },
  },
  {
    text: "Last month",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    },
  },
  {
    text: "Last 3 months",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      return [start, end];
    },
  },
];
</script>
    
<style scoped lang="less">
.outer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.time {
  height: 48px;
  border-bottom: 1px solid black;
}
.data {
  margin-top: 40px;
}
</style>
    