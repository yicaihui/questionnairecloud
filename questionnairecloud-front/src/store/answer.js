import { defineStore } from "pinia";

export const useAnswerStore = defineStore('answer', {
    // 真正存储数据的地方
    state() {
        return {
            answerList: [],
        }
    },
    actions: {
        update_answerList({ componentId, answer }) {
            console.log(componentId, answer)
            for (let answerL of this.answerList) {
                if (answerL.componentId == componentId) {
                    answerL.answer = answer
                    return
                }
            }
            this.answerList.push({ componentId, answer })
        }
    }
})
