<template>
  <div class="titlecanvas">
    <ed-comp-title v-if="showTitle"></ed-comp-title>
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
      <ed-comp-input
        v-for="(option, index) in question.quMultiFillblanks"
        :key="index"
        :option="option"
        :placeholder="option.optionPlaceholder"
        disabled
      ></ed-comp-input>
    </template>
    <!-- date -->
    <template v-if="question.quType == 'date'">
      <ed-comp-date disabled></ed-comp-date>
    </template>
    <!-- dropdown -->
    <template v-if="question.quType == 'dropdown'">
      <ed-comp-dropdown disabled :lists="question.quRadios"></ed-comp-dropdown>
    </template>
    <!-- fileUpdate -->
    <template v-if="question.quType == 'fileUpdate'">
      <ed-comp-upload disabled></ed-comp-upload>
    </template>
    <!-- matrix -->
    <template v-if="question.quType == 'matrix'">
      <ed-comp-matrix
        disabled
        :question="question"
        :quRows="question.quRows"
        :quCols="question.quCols"
      ></ed-comp-matrix>
    </template>
    <!-- singleChoice -->
    <template v-if="question.quType == 'singleChoice'">
      <ed-comp-radio :lists="question.quRadios"></ed-comp-radio>
    </template>
    <!-- multipleChoice -->
    <template v-if="question.quType == 'multipleChoice'">
      <ed-comp-checkbox :lists="question.quCheckboxs"></ed-comp-checkbox>
    </template>
    <!-- opinionScale -->
    <template v-if="question.quType == 'opinionScale'">
      <ed-comp-opinionScale></ed-comp-opinionScale>
    </template>
    <!-- pictureChoice -->
    <template v-if="question.quType == 'pictureChoice'">
      <ed-comp-pictureChoice :lists="question.quRadios"></ed-comp-pictureChoice>
    </template>
    <!-- ranking -->
    <template v-if="question.quType == 'ranking'">
      <ed-comp-ranking :lists="question.quOrderbys"></ed-comp-ranking>
    </template>
    <!-- rating -->
    <template v-if="question.quType == 'rating'">
      <ed-comp-rating></ed-comp-rating>
    </template>
    <!-- yesNo -->
    <template v-if="question.quType == 'yesNo'">
      <ed-comp-radio :lists="quRadios"></ed-comp-radio>
    </template>
    <!-- slider -->
    <template v-if="question.quType == 'slider'">
      <ed-comp-slider></ed-comp-slider>
    </template>
  </div>
</template>

<script setup>
import EdCompSlider from "./ed-comp-question/ed-comp-slider.vue";
import { useQuestionStore } from "@/store/question.js";
import { computed, toRefs } from "vue";

let questionStore = useQuestionStore();
const props = defineProps({
  question: {
    type: Object,
  },
  showTitle: {
    type: Boolean,
    default: true,
  },
});
// let { question } = toRefs(props);
</script>

<style>
.titlecanvas {
  padding-left: 30px;
}
</style>