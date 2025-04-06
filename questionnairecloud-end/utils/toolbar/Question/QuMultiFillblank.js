const { nanoid } = require("nanoid")

class QuMultiFillblank {
    constructor(optionTitle, optionPlaceholder) {
        this.optionTitle = optionTitle
        this.optionPlaceholder = optionPlaceholder
        this.id = nanoid()

    }
}
module.exports = QuMultiFillblank