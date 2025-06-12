<template>
  <ed-comp-title></ed-comp-title>
  <div
    class="question"
    v-for="(qu, index) in question.quQuestions"
    :key="index"
  >
    <input
      v-model="qu.optionTitle"
      @blur="change_question"
      placeholder="填写你的问题"
    />
    <an-comp-title-canvas
      :question="qu"
      :showTitle="false"
    ></an-comp-title-canvas>
  </div>
</template>
    
  <script setup>
defineProps(["question"]);
function change_question() {}
</script>

<style scoped lang="less">
input {
  border: none;
  outline: none;
  width: 100%;
  color: rgb(4, 69, 175);
  font-size: 16px;
}
input::placeholder {
  color: rgb(4, 69, 175);
}
</style>
    
    