
<template>
  <div class="left">
    <!-- 已有的问题列表 -->
    <edit-lists></edit-lists>
  </div>
  <div class="middle">
    <div class="cmds">
      <div class="add items">
        <el-button
          color="#fff"
          :icon="Plus"
          @click="dialogContentVisible = true"
          >添加新内容</el-button
        >
        <el-dialog
          v-model="dialogContentVisible"
          title="添加表单元素"
          width="960"
          top="8vh"
        >
          <div class="dialog-content">
            <div class="right-search">
              <el-input
                v-model="input2"
                style="width: 240px"
                placeholder="搜索表单元素"
                :prefix-icon="Search"
              />
            </div>
            <div class="elements">
              <div
                class="element"
                v-for="tabs in toolbar_list"
                :key="tabs.tabName"
              >
                <div class="title">{{ tabs.tabName }}</div>
                <ul>
                  <li
                    class="ele-ch"
                    v-for="tab in tabs.tabQus"
                    :key="tab.quType"
                    @click="add_element(tab)"
                  >
                    <div
                      class="ele-icon"
                      :style="{ background: get_tabs_color(tabs.tabName) }"
                    >
                      <el-icon
                        ><component :is="tab_iconComp[tab.quType]"
                      /></el-icon>
                    </div>

                    <span>{{ tab.quLabel }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </el-dialog>
      </div>
      <div class="border"></div>
      <div class="design items">
        <el-button color="#f7f7f6" :icon="EditPen">主题设计</el-button>
      </div>
      <div class="border"></div>
      <div class="items">
        <el-tooltip
          class="box-item"
          effect="dark"
          content="桌面模式"
          placement="bottom"
        >
          <el-button class="small-btn" color="#f7f7f6" :icon="Monitor" />
        </el-tooltip>
        <el-tooltip
          class="box-item"
          effect="dark"
          content="预览"
          placement="bottom"
        >
          <el-button
            class="small-btn"
            color="#f7f7f6"
            :icon="VideoPlay"
            @click="previewDialogVisible = true"
          />
        </el-tooltip>
        <el-dialog
          v-model="previewDialogVisible"
          width="100%"
          :show-close="false"
          :style="{ height: '100%', margin: 0 }"
        >
          <template #header>
            <div class="header">
              <el-button-group class="ml-4">
                <el-button
                  type="primary"
                  :icon="Close"
                  @click="previewDialogVisible = false"
                />
                <el-button type="primary" :icon="Monitor" />
                <el-button type="primary" :icon="Refresh" />
              </el-button-group>
            </div>
          </template>
          <preview-body></preview-body>
        </el-dialog>
      </div>
      <div class="border"></div>
      <div class="items">
        <el-tooltip
          class="box-item"
          effect="dark"
          content="检查"
          placement="bottom"
        >
          <el-button class="small-btn" color="#f7f7f6" :icon="Checked" />
        </el-tooltip>
        <el-tooltip
          class="box-item"
          effect="dark"
          content="历史版本"
          placement="bottom"
        >
          <el-button class="small-btn" color="#f7f7f6" :icon="RefreshRight" />
        </el-tooltip>
        <el-tooltip
          class="box-item"
          effect="dark"
          content="翻译"
          placement="bottom"
        >
          <el-button class="small-btn" color="#f7f7f6" :icon="Comment" />
        </el-tooltip>
        <el-tooltip
          class="box-item"
          effect="dark"
          content="设置"
          placement="bottom"
        >
          <el-button class="small-btn" color="#f7f7f6" :icon="Setting" />
        </el-tooltip>
      </div>
      <div class="publish">
        <el-button color="black" @click="save_questions">保存问卷</el-button>
        <el-button color="black" :icon="Position" @click="publish_questions"
          >发布问卷</el-button
        >
      </div>
    </div>
    <div class="middle-body" ref="bodyRef">
      <div
        class="canvas-outer"
        :style="{
          height: '611px',
          width: '1087px',
        }"
        ref="canvasOuterRef"
      >
        <edit-canvas v-if="questions && questions.length != 0"></edit-canvas>
      </div>
    </div>
  </div>
  <div class="right"></div>
</template>

<script setup>
import api from "../utils/api";
import { useQuestionStore } from "@/store/question.js";
import {
  Plus,
  EditPen,
  Monitor,
  VideoPlay,
  Checked,
  RefreshRight,
  Comment,
  Setting,
  Position,
  Search,
  User,
  Postcard,
  Message,
  House,
  Iphone,
  Operation,
  Picture,
  ArrowDown,
  Aim,
  Star,
  DataAnalysis,
  CirclePlus,
} from "@element-plus/icons-vue";
import { onMounted, ref, h, computed } from "vue";
import { ElButton, ElInput } from "element-plus";

let questionStore = useQuestionStore();

const questions = computed(() => {
  return questionStore.survey.questions;
});

//获取高度
let bodyRef = ref(null);
let canvasOuterRef = ref(null);

onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});
function handleResize() {
  //确定宽度和高度
  //先按照宽度计算，如果计算出来的高度超出了，那就按照高度计算
  let width = Math.min(bodyRef.value.offsetWidth - 24, 1087);
  let height = (width * 9) / 16;
  if (height + 48 > bodyRef.value.offsetHeight) {
    height = bodyRef.value.offsetHeight - 48;
    width = (height * 16) / 9;
  }
  //计算缩小的比例
  const rate = width / 1087;
  //类似于先放大，再缩
  canvasOuterRef.value.style.width = width / rate + "px";
  canvasOuterRef.value.style.height = height / rate + "px";
  //居中
  let padding = (bodyRef.value.offsetWidth - width) / 2;
  bodyRef.value.style.padding = `24px ${padding}px`;
  canvasOuterRef.value.style.transform = `translate(${
    (width - width / rate) / 2
  }px,${(height - height / rate) / 2}px) scale(${rate})`;
  canvasOuterRef.value.style.transformOrigin = "center center";
  canvasOuterRef.value.style.transition = "0.05s transform";
  canvasOuterRef.value.style.border = `border: 2px solid #f7f7f6;`;
}

//创建新问题弹出框
const dialogContentVisible = ref(false);
const toolbar_list = ref([]);

async function toolbar_get() {
  let res = await api.toolbar_get();
  toolbar_list.value = res.lists;
}
function get_tabs_color(name) {
  switch (name) {
    case "联系信息":
      return "#f8cdd8";
    case "选择题":
      return "#ddd6fa";
    case "评分和排名":
      return "#c4e3ba";
    case "文本和视频":
      return "#bdddf9";
    case "其他":
      return "#fbe19d";
    case "开始和结束":
      return "#dedcde";
  }
}
const tab_iconComp = {
  contactInfo: User,
  idNumber: Postcard,
  email: Message,
  phoneNumber: Iphone,
  address: House,
  multipleChoice: Operation,
  pictureChoice: Picture,
  dropdown: ArrowDown,
  yesNo: Aim,
  rating: Star,
  opinionScale: DataAnalysis,
  ranking: CirclePlus,
  matrix: CirclePlus,
};

toolbar_get();

//创建新问题
function add_element(tab) {
  dialogContentVisible.value = false;
  questionStore.add_question(JSON.parse(JSON.stringify(tab)));
}
//保存问卷
async function save_questions() {
  let res = await api.question_update(questionStore.survey_id, {
    title: questionStore.survey.title,
    questions: JSON.stringify(questionStore.survey.questions),
  });
}
//发布问卷
async function publish_questions() {
  let res = await api.question_update(questionStore.question_id, {
    componentLists: questionStore.componentLists,
    status: "published",
  });
  function click_copy(link) {
    var input = document.createElement("input"); // 创建input对象
    input.value = link; // 设置复制内容
    document.body.appendChild(input); // 添加临时实例
    input.select(); // 选择实例内容
    document.execCommand("Copy"); // 执行复制
    document.body.removeChild(input); // 删除临时实例
  }
  if (res.code == 200) {
    let link = "http://localhost:5173/#/to/" + res.data.id;
    ElMessageBox({
      title: "问卷已经发布",
      message: () =>
        h("div", {}, [
          link,
          h(
            ElButton,
            {
              onClick: click_copy(link),
            },
            "复制连接"
          ),
        ]),
    });
  }
}
const previewDialogVisible = ref(false);
</script>

<style scoped lang="less">
.dialog-content {
  height: 680px;
  padding: 30px;
  display: flex;
  justify-content: space-between;
  .right-search {
    width: 208px;
    margin-right: 20px;
    .el-input {
      width: 100% !important;
    }
  }
  .elements {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    .element {
      width: 202px;
      .title {
        height: 40px;
        line-height: 40px;
        font-weight: 800;
      }
      .ele-ch {
        .ele-icon {
          width: 28px;
          height: 28px;
          margin-right: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 20%;
          overflow: hidden;
        }
        height: 40px;
        padding: 6px 12px 6px 8px;
        display: flex;
        align-items: center;
      }
    }
  }
}
.left,
.right {
  width: 256px;
  background-color: #f7f7f6;
  height: 100%;
  overflow: auto;
  border-radius: 15px;
}
.left {
  float: left;
}
.right {
  float: right;
}
.middle {
  position: absolute;
  top: 0;
  bottom: 30px;
  left: 298px;
  right: 298px;
  .cmds {
    height: 48px;
    padding: 8px;
    background-color: #f7f7f6;
    border-radius: 15px;
    display: flex;
    align-items: center;
    .items {
      padding: 0 12px;
    }
    .border {
      width: 1px;
      height: 16px;
      background-color: rgb(185, 185, 185);
    }
    .add button {
      border: 0.6px solid rgba(25, 25, 25, 0.15);
    }
    .publish {
      margin-left: auto;
    }
  }
  .middle-body {
    position: absolute;
    top: 48px;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 24px 12px;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    .canvas-outer {
      border: 2px solid #f7f7f6;
    }
  }
}
</style>