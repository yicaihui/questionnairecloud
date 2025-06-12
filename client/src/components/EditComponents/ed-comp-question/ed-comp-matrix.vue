<template>
  <div class="question">
    <table>
      <thead>
        <tr class="item">
          <th></th>
          <td v-for="col in quCols" :key="col">{{ col }}</td>
        </tr>
      </thead>
      <tbody>
        <tr class="item" v-for="row in quRows" :key="row">
          <th>{{ row }}</th>
          <td v-for="col in quCols" :key="col">
            <el-radio disabled="disabled"></el-radio>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
    
<script setup>
defineProps(["question", "quRows", "quCols", "disabled"]);
</script>
  
<style scoped lang="less">
table {
  width: 100%;
}
.item {
  display: flex;
  justify-content: space-between;
}
</style>