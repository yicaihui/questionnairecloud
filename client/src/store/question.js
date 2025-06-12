import { defineStore } from "pinia";
import Tools from "@/utils/tools.js";

export const useQuestionStore = defineStore('question', {
    // 真正存储数据的地方
    state() {
        return {
            survey_id: '',
            survey_title: '',
            //{id,type,props}
            survey: {},
            selected_question_index: -1
        }
    },
    actions: {
        change_surveyInfo(survey) {
            this.survey_id = survey._id
            this.survey_title = survey.title
            this.survey = survey
            if (survey.questions.length > 0) {
                this.selected_question_index = 0
            }
        },
        add_question(item) {
            item.id = Tools.guid();
            this.survey.questions.push(item)
            this.selected_question_index = this.survey.questions.length - 1
            console.log(this.survey, this.selected_question_index)
        },
        change_selected(questionOrId) {
            if (typeof questionOrId == 'number') {
                this.selected_question_index = questionOrId
                return
            }
            let index = this.survey.questions.indexOf(questionOrId)
            this.selected_question_index = index
        },
        //更新问题
        update_question(options) {
            options.title && (this.survey.questions[this.selected_question_index].quTitle = options.title)
            options.note && (this.survey.questions[this.selected_question_index].quNote = options.note)
            options.quCheckboxs && (this.survey.questions[this.selected_question_index].quCheckboxs = options.quCheckboxs)
            options.quRadios && (this.survey.questions[this.selected_question_index].quRadios = options.quRadios)

            console.log(options)
            console.log(this.survey.questions[this.selected_question_index])
        }
    }
})
