<template>
  <header class="header">
    <div class="title">
      <div class="logo">
        <img src="@/assets/cloud.png" alt="" width="100%" height="100%" />
      </div>
      <el-dropdown trigger="click" v-if="props.page_type == 'manage'">
        <span class="el-dropdown-link">
          {{ userStore.username
          }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :icon="Plus">Action 1</el-dropdown-item>
            <el-dropdown-item :icon="CirclePlusFilled">
              Action 2
            </el-dropdown-item>
            <el-dropdown-item :icon="CirclePlus">Action 3</el-dropdown-item>
            <el-dropdown-item :icon="Check">Action 4</el-dropdown-item>
            <el-dropdown-item :icon="CircleCheck">Action 5</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!-- 面包屑 -->
      <el-breadcrumb
        :separator-icon="ArrowRight"
        v-if="props.page_type == 'edit'"
      >
        <el-breadcrumb-item :to="{ name: 'manage' }"
          >我的工作区</el-breadcrumb-item
        >
        <el-breadcrumb-item>{{
          questionStore.question_title
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="bar" v-if="props.page_type == 'edit'">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="创建" name="create"></el-tab-pane>
        <el-tab-pane label="逻辑" name="logic"></el-tab-pane>
        <el-tab-pane label="分享" name="share"></el-tab-pane>
        <el-tab-pane label="结果" name="results"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="header-right">
      <div class="items items-border">
        <el-button color="white" @click="trans_page('manage')"
          >我的问卷</el-button
        >
      </div>
      <div class="items items-border">
        <el-button color="white" @click="trans_page('manage')"
          >帮助中心</el-button
        >
      </div>
      <div class="items">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <div class="photo-box"></div>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :icon="Plus">Action 1</el-dropdown-item>
              <el-dropdown-item :icon="CirclePlusFilled">
                Action 2
              </el-dropdown-item>
              <el-dropdown-item :icon="CirclePlus">Action 3</el-dropdown-item>
              <el-dropdown-item :icon="Check">Action 4</el-dropdown-item>
              <el-dropdown-item :icon="CircleCheck">Action 5</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useUserStore } from "@/store/user.js";
import { ArrowRight } from "@element-plus/icons-vue";
import { useQuestionStore } from "@/store/question.js";
import { ref } from "vue";
import { useRouter } from "vue-router";

let questionStore = useQuestionStore();
let userStore = useUserStore();
const props = defineProps({
  page_type: {
    type: String,
    default: "manage",
  },
});
const router = useRouter();

//bar
let activeName = ref("create");
function handleClick(tab, ev) {
  router.push({
    name: tab.paneName,
    query: { id: questionStore.survey_id },
  });
}
</script>

<style scoped lang="less">
.bar .el-tabs {
  margin-bottom: -15px;
}
.btn {
  width: 32px;
}
.header {
  height: 56px;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title {
    display: flex;
    align-items: center;
    font-weight: 600;
  }
  .logo {
    width: 25px;
    height: 25px;
    margin-right: 8px;
  }
  .header-right {
    display: flex;
    justify-content: right;
    align-items: center;
    .items {
      display: flex;
      align-items: center;
      padding: 0 15px;
      .text {
        margin-left: 5px;
      }
    }
    .items-border {
      border-right: 1px solid rgb(214, 214, 214);
    }
    .photo-box {
      width: 30px;
      height: 30px;
      background-color: pink;
      border-radius: 50%;
    }
  }
}
</style>
