const { nanoid } = require('nanoid');
class Question {
    quType
    quTitle = ''
    quNote = ''
    quMultiFillblanks
    quCheckboxs
    id
    quRadios
    quOrderbys
    quQuestions
    isFullScreen = false
    isMultiPage = false
    quLogics = []
    isShow = true
    quAnswer = []
    constructor(quType, quLabel) {
        this.quType = quType
        this.quLabel = quLabel
    }
    setQuMultiFillblanks(quMultiFillblanks) {
        this.quMultiFillblanks = quMultiFillblanks
    }
    setQuCheckboxs(quCheckboxs) {
        this.quCheckboxs = quCheckboxs
    }
    setQuRadios(quRadios) {
        this.quRadios = quRadios
    }
    setQuOrderbys(quOrderbys) {
        this.quOrderbys = quOrderbys
    }
    setQuRows(quRows) {
        this.quRows = quRows
    }
    setQuCols(quCols) {
        this.quCols = quCols
    }
    setQuquestions(quQuestions) {
        this.quQuestions = quQuestions
    }
}

module.exports = Question