const { nanoid } = require("nanoid")

class QuCheckbox {
    constructor(optionTitle) {
        this.optionTitle = optionTitle
        this.id = nanoid()
    }
}
module.exports = QuCheckbox