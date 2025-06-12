<template>
  <div class="titlecanvas">
    <an-comp-title :question="question" :index="index"></an-comp-title>
    <!-- input -->
    <template
      v-if="
        question.quType == 'contactInfo' ||
        question.quType == 'email' ||
        question.quType == 'phoneNumber' ||
        question.quType == 'address' ||
        question.quType == 'idNumber' ||
        question.quType == 'shortText' ||
        question.quType == 'number' ||
        question.quType == 'multipleText'
      "
    >
      <an-comp-input
        v-for="option in question.quMultiFillblanks"
        :key="option.id"
        :option="option"
        :index="index"
      ></an-comp-input>
    </template>
    <!-- date -->
    <template v-if="question.quType == 'date'">
      <an-comp-date disabled></an-comp-date>
    </template>
    <!-- dropdown -->
    <template v-if="question.quType == 'dropdown'">
      <an-comp-dropdown disabled :lists="question.quRadios"></an-comp-dropdown>
    </template>
    <!-- fileUpdate -->
    <template v-if="question.quType == 'fileUpdate'">
      <an-comp-upload disabled></an-comp-upload>
    </template>
    <!-- matrix -->
    <template v-if="question.quType == 'matrix'">
      <an-comp-matrix
        disabled
        :question="question"
        :quRows="question.quRows"
        :quCols="question.quCols"
      ></an-comp-matrix>
    </template>
    <!-- singleChoice -->
    <template v-if="question.quType == 'singleChoice'">
      <an-comp-radio :lists="question.quRadios"></an-comp-radio>
    </template>
    <!-- multipleChoice -->
    <template v-if="question.quType == 'multipleChoice'">
      <an-comp-checkbox :lists="question.quCheckboxs"></an-comp-checkbox>
    </template>
    <!-- opinionScale -->
    <template v-if="question.quType == 'opinionScale'">
      <an-comp-opinionScale></an-comp-opinionScale>
    </template>
    <!-- pictureChoice -->
    <template v-if="question.quType == 'pictureChoice'">
      <an-comp-pictureChoice :lists="question.quRadios"></an-comp-pictureChoice>
    </template>
    <!-- ranking -->
    <template v-if="question.quType == 'ranking'">
      <an-comp-ranking :lists="question.quOrderbys"></an-comp-ranking>
    </template>
    <!-- rating -->
    <template v-if="question.quType == 'rating'">
      <an-comp-rating></an-comp-rating>
    </template>
    <!-- yesNo -->
    <template v-if="question.quType == 'yesNo'">
      <an-comp-radio :lists="quRadios"></an-comp-radio>
    </template>
    <!-- slider -->
    <template v-if="question.quType == 'slider'">
      <an-comp-slider></an-comp-slider>
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  question: {
    type: Object,
  },
  index: {
    type: Number,
  },
});
</script>

<style>
.titlecanvas {
  padding-left: 30px;
}
</style>