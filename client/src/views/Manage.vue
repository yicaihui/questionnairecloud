<template>
  <manage-header></manage-header>
  <div class="manage-body">
    <div class="content">
      <div class="content-left">
        <div class="items create">
          <el-button color="black" :icon="Plus" @click="create_new_form"
            >创建新表单</el-button
          >
        </div>
        <div class="items search">
          <el-button color="#f7f7f6" :icon="Search">搜索</el-button>
        </div>
        <div class="items workspace-list">
          <div class="title">
            <el-icon><Folder /></el-icon>
            <span class="text">工作区</span>
            <el-tooltip
              class="box-item"
              effect="dark"
              content="创建工作区"
              placement="bottom"
            >
              <el-button type="primary" :icon="Plus" color="white" />
            </el-tooltip>
          </div>
          <div class="personal">
            <el-menu
              default-active="1-0"
              class="el-menu-vertical-demo"
              background-color="#f7f7f6"
            >
              <el-sub-menu index="1">
                <template #title>
                  <span>个人工作区</span>
                </template>
                <el-menu-item
                  :index="`1-${index}`"
                  v-for="(space, index) in workspace_p"
                  :key="space._id"
                  @click="change_active_workspace(space)"
                  >{{ space.name }}</el-menu-item
                >
              </el-sub-menu>
              <el-sub-menu index="2">
                <template #title>
                  <span>合作工作区</span>
                </template>
                <el-menu-item
                  :index="`2-${index}`"
                  v-for="(space, index) in workspace_co"
                  :key="space._id"
                  >{{ space.name }}</el-menu-item
                >
              </el-sub-menu>
            </el-menu>
          </div>
          <div class="group">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#f7f7f6"
            >
            </el-menu>
          </div>
        </div>
        <div class="items response">
          <div class="text">收集到的新回复</div>
          <div class="bar"></div>
          <div class="bar-text">0 / 10</div>
          <div class="time">截至2025-1-2</div>
        </div>
      </div>
      <div class="content-right">
        <div class="title">
          <div class="title-left">
            <div class="name items">{{ active_workspace.name }}</div>
            <div class="settings items">
              <el-button color="#f7f7f6" :icon="MoreFilled" />
            </div>
            <!-- 邀请协同管理 -->
            <div class="invite items">
              <el-button color="#f7f7f6" :icon="User" @click="open_invite"
                >邀请他人加入</el-button
              >
              <el-dialog v-model="inviteVisible" title="设置管理员" width="800">
                <el-button @click="invite_add = true">添加用户</el-button>
                <el-button>清空管理员</el-button>
                <div class="invite-table">
                  <div class="invite-header">
                    <span>用户名称</span>
                    <span>操作</span>
                  </div>
                  <div class="invite-content">
                    <ul>
                      <li class="item">
                        <span>{{ userStore.username }}</span>
                        <span>创建者</span>
                      </li>
                      <li v-for="name in copartners" :key="name" class="item">
                        <span>{{ name }}</span>
                        <span>管理员</span>
                      </li>
                    </ul>
                  </div>
                  <el-dialog
                    v-model="invite_add"
                    width="500"
                    title="添加管理员"
                    append-to-body
                  >
                    <el-input
                      v-model="searchValue"
                      placeholder="请输入需要搜索的用户名称"
                      :suffix-icon="Search"
                      @input="change_search_value"
                    />
                    <el-checkbox-group v-model="inviteCheckList">
                      <div class="invite-add-box">
                        <el-checkbox
                          v-for="p in name_lists"
                          :key="p._id"
                          :label="p.username"
                          :value="p._id"
                        />
                      </div>
                    </el-checkbox-group>

                    <template #footer>
                      <div class="dialog-footer">
                        <el-button @click="invite_add = false">取消</el-button>
                        <el-button type="primary" @click="confirm_invite">
                          确定
                        </el-button>
                      </div>
                    </template>
                  </el-dialog>
                </div>
              </el-dialog>
            </div>
          </div>
          <div class="title-right">
            <div class="sort items">
              <el-select v-model="sort_value" style="width: 240px">
                <el-option
                  v-for="item in sort_arr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                  <span style="float: left">{{ item.label }}</span>
                </el-option>
              </el-select>
            </div>
            <div class="list-grid items">
              <el-radio-group v-model="list_grid_value">
                <el-radio-button label="列表" value="list" />
                <el-radio-button label="表格" value="grid" />
              </el-radio-group>
            </div>
          </div>
        </div>
        <div class="body">
          <div class="body-title">
            <div class="items">问卷状态</div>
            <div class="items">响应数量</div>
            <div class="items">更新日期</div>
          </div>
          <div class="body-content">
            <div
              class="box"
              v-for="item in questionnaires_lists"
              :key="item._id"
              @click="go_edit_id(item._id)"
            >
              <div class="left">
                <el-icon><ScaleToOriginal /></el-icon>
                <div class="name">{{ item.title }}</div>
              </div>
              <div class="right">
                <div class="status items">{{ status_mapper[item.status] }}</div>
                <div class="response items">{{ item.response }}</div>
                <div class="update items">
                  {{ item.updatedAt.split(" ")[0] }}
                </div>
                <div class="edit-btn items">
                  <el-button color="#fff" :icon="MoreFilled" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script setup>
import { useRouter } from "vue-router";
import { ElMessageBox } from "element-plus";
import { Plus, Search, MoreFilled, User } from "@element-plus/icons-vue";
import { reactive, ref, watch, toRaw } from "vue";
import api from "../utils/api";
import { useUserStore } from "@/store/user.js";

let userStore = useUserStore();
//用户信息
api.hasToken().then((res) => {
  userStore.change_username(res.userInfo.username);
});
//获取工作空间
let workspace_p = ref([]);
let workspace_co = ref([]);
let active_workspace = ref({});
async function get_workspace() {
  let res = await api.workspace_get();
  workspace_p.value = res.personal;
  workspace_co.value = res.copartner;
  active_workspace.value = workspace_p.value[0];
}
get_workspace();
//获取表单
const questionnaires_lists = ref([]);
async function get_question_lists(wor) {
  let res = await api.question_get(wor._id);
  questionnaires_lists.value = res.lists;
  active_workspace.value = wor;
}
watch(active_workspace, get_question_lists, { immediate: true });
function change_active_workspace(space) {
  active_workspace.value = space;
}
const router = useRouter();
function trans_page(options) {
  router.push(options);
}
const props = defineProps({
  page_type: {
    type: String,
    default: "home",
  },
});
const status_mapper = {
  unpublish: "未发布",
};
//创建新表单
async function create_new_form() {
  let res = await api.question_create(active_workspace.value._id);
  go_edit_id(res.id);
}
function go_edit_id(id) {
  trans_page({ path: "/edit", query: { id } });
}
//排序方式
const sort_value = ref("date");
const sort_arr = [
  { value: "date", label: "按创建日期排序" },
  { value: "last", label: "按最后更新时间排序" },
];
const list_grid_value = ref("list");
//多人共同协作
const inviteVisible = ref(false);
function open_invite() {
  inviteVisible.value = true;
  get_copartners();
}
const copartners = ref([]);
async function get_copartners() {
  let id = active_workspace.value._id;
  let res = await api.workspace_detail(id);
  copartners.value = res.lists;
}
const invite_add = ref(false);
const searchValue = ref("");
const name_lists = ref([]);
async function change_search_value() {
  let res = await api.searchUsername(searchValue.value);
  name_lists.value = res.lists;
}
const inviteCheckList = ref([]);
//添加管理员
async function confirm_invite() {
  let ids = toRaw(inviteCheckList.value);
  await api.workspace_addcopartners(active_workspace.value._id, ids);
  inviteCheckList.value = [];
  searchValue.value = "";
  invite_add.value = false;
  get_copartners();
}
</script>
    
<style scoped lang="less">
.manage-body {
  position: absolute;
  top: 56px;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 30px 20px;
  .content {
    height: 100%;
    width: 100%;
    border-radius: 20px;
    display: flex;
    overflow: hidden;
    .content-left {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 265px;
      margin-right: 2px;
      .items {
        padding: 20px;
        margin-bottom: 1px;
        background-color: #f7f7f6;
      }
      .create button {
        width: 100%;
        height: 32px;
        border-radius: 10px;
      }
      .search {
        padding: 8px 20px;
        height: 56px;
        button {
          height: 42px;
        }
      }
      .workspace-list {
        flex: 1;
        overflow: auto;
        .title {
          height: 56px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .text {
            flex: 1;
            margin-left: 10px;
          }
          button {
            width: 25px;
          }
        }
        .personal,
        .group {
          padding: 0 10px;
          .el-menu {
            border: none;
          }
        }
      }
      .response {
        height: 100px;
      }
    }
    .content-right {
      flex: 1;
      background-color: #f7f7f6;
      padding: 40px;
      overflow: auto;

      .title {
        height: 50px;
        padding-bottom: 20px;
        border-bottom: 2px solid rgba(25, 25, 25, 0.08);
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 28px;
        .title-left,
        .title-right {
          display: flex;
          align-items: center;
        }
        .title-left {
          .items {
            margin-right: 5px;
          }
          .name {
            font-size: 23px;
          }
          .settings button {
            width: 32px;
          }
        }
        .title-right {
          .items {
            margin-left: 15px;
          }
        }
      }
      .body {
        .body-title {
          height: 50px;
          display: flex;
          justify-content: right;
          align-items: center;
          padding: 0 112px 0 12px;
          .items {
            width: 100px;
            text-align: center;
          }
        }
        .box {
          height: 56px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #fff;
          border-radius: 10px;
          border: 1px solid #eee;
          margin-bottom: 8px;
          padding: 0 12px;
          .name {
            margin-left: 20px;
          }
          .left {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .right {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .items {
              width: 100px;
              text-align: center;
              button {
                width: 32px;
              }
            }
          }
        }
      }
    }
  }
}
.invite-table {
  margin-top: 20px;
  border: 1px solid #eee;
  overflow: auto;
  .invite-header {
    height: 50px;
    background-color: #f7f7f6;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
  }
  .invite-content {
    padding: 20px 10px;
    height: 400px;
    .item {
      height: 35px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
.invite-add-box {
  height: 200px;
  border: 1px solid #eee;
  margin-top: 20px;
  padding: 10px;
  display: flex;
  flex-direction: column;
}
</style>
    