<template>
  <div class="choices">
    <div class="choice" v-for="(option, index) in lists" :key="index">
      <div class="choice_picture">
        <el-upload
          class="avatar-uploader"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </div>
      <div class="choice_bottom">
        <div class="idx">{{ index + 1 }}</div>
        <el-input
          v-model="option.optionTitle"
          :autosize="{
            minRows: 1,
          }"
          :style="{ width: '116px' }"
          type="textarea"
          @input="change_optionTitle()"
        ></el-input>
      </div>
    </div>
    <!-- 添加新选项 -->
    <div class="choice choice-plus" @click="add_radio">
      <el-icon><Plus /></el-icon>
    </div>
  </div>
</template>
      
  <script setup>
import { onMounted, ref, toRefs } from "vue";
import { useQuestionStore } from "@/store/question.js";

let questionStore = useQuestionStore();

const props = defineProps(["lists"]);
let { lists } = toRefs(props);
function change_optionTitle() {
  questionStore.update_question({ quRadios: lists.value });
}
function add_radio() {
  lists.value.push({ optionTitle: "" });
  change_optionTitle();
}
</script>
      
<style scoped lang="less">
.choices {
  display: flex;
  flex-wrap: wrap;
  .choice {
    padding: 4px 8px;
  }
  .choice-plus {
    font-size: 16px;
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .choice_picture {
    width: 156px;
    height: 156px;
    background-color: rgba(4, 69, 175, 0.1);

    .avatar-uploader .avatar {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .choice_bottom {
    display: flex;
    padding: 8px 0;
    .idx {
      width: 22px;
      height: 22px;
      margin-right: 4px;
      text-align: center;
      background-color: #fff;
      border: 1px solid rgba(4, 69, 175, 0.6);
      border-radius: 2px;
    }
  }
}
.choice {
  width: 172px;
  background-color: rgba(4, 69, 175, 0.1);
  border-radius: 4px;
  border: 1px solid rgb(4, 69, 175);
  color: rgb(4, 69, 175);
  margin-right: 8px;
  margin-bottom: 8px;
  textarea {
    background-color: transparent !important;
  }
  margin-bottom: 8px;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 156px;
  height: 156px;
  text-align: center;
}
</style>