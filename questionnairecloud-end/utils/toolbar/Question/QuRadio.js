const { nanoid } = require("nanoid")

class QuRadio {
    constructor(optionTitle) {
        this.optionTitle = optionTitle
        this.id = nanoid()

    }
}
module.exports = QuRadio