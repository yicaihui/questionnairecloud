<template>
  <div class="option">
    <div class="month">
      <div class="text">月</div>
      <input placeholder="MM" :readonly="disabled" />
    </div>
    <span class="sign"> / </span>
    <div class="month">
      <div class="text">日</div>
      <input placeholder="DD" :readonly="disabled" />
    </div>
    <span class="sign"> / </span>
    <div class="month">
      <div class="text">年</div>
      <input class="inp-last" placeholder="YYYY" :readonly="disabled" />
    </div>
  </div>
</template>
    
<script setup>
defineProps({
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
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  font-size: 30px;
  .text {
    font-size: 16px;
    margin-bottom: 5px;
    color: rgb(4, 69, 175);
  }
  .sign {
    padding: 0 10px 8px 10px;
    color: rgb(4, 69, 175);
  }
  input {
    border: none;
    outline: none;
    padding-bottom: 8px;
    font-size: 30px;
    width: 50px;
    border-bottom: 1px solid #b3c7e7;
  }
  input::placeholder {
    color: #b3c7e7;
  }
  .inp-last {
    width: 100px;
  }
}
</style>