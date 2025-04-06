<template>
  <div class="option">
    <div class="title" v-if="option.optionTitle">{{ option.optionTitle }}</div>
    <input :placeholder="placeholder" :readonly="disabled" />
  </div>
</template>
  
<script setup>
defineProps({
  option: {
    type: Object,
    default: {},
  },
  placeholder: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
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