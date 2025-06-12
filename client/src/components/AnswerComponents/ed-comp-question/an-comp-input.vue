<template>
  <div class="option">
    <div class="title" v-if="option.optionTitle">{{ option.optionTitle }}</div>
    <input
      :placeholder="option.optionPlaceholder"
      v-model="text_value"
      @blur="change_answer"
    />
  </div>
</template>
  
<script setup>
import { inject, ref } from "vue";

const props = defineProps({
  option: {
    type: Object,
    default: {},
  },
  index: {
    type: Number,
  },
});
const emit = defineEmits(["change_answer"]);

const text_value = ref("");
const handler_change_answer = inject("change_answer");
function change_answer() {
  console.log(text_value.value);
  handler_change_answer(props.index, props.option.id, text_value.value);
}
</script>
  
<style scoped lang="less">
.option {
  width: 100%;
  margin-bottom: 48px;
  border-bottom: 1px solid #b3c7e7;
  .title {
    margin-bottom: 8px;
    font-size: 20px;
  }
  input {
    border: none;
    outline: none;
    font-size: 24px;
    padding-bottom: 8px;
    width: 100%;
  }
  input::placeholder {
    color: #b3c7e7;
    height: 100%;
  }
}
</style>