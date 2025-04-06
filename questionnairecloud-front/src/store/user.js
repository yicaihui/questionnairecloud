import { defineStore } from "pinia";
export const useUserStore = defineStore('user', {
    // 真正存储数据的地方
    state() {
        return {
            username: ''
        }
    },
    actions: {
        change_username(name) {
            this.username = name
        }
    }
})
