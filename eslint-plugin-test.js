const testRule = require("./rules/no-import-from-top.js")
const plugin = {
  rules: {
    "no-import-from-top": testRule
  }
}
module.exports = plugin