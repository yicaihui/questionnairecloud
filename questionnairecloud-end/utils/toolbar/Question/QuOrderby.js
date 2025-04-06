const { nanoid } = require("nanoid")

class QuOrderby {
    constructor(optionTitle) {
        this.optionTitle = optionTitle
        this.id = nanoid()

    }
}
module.exports = QuOrderby