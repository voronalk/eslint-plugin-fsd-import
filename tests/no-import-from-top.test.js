const { RuleTester } = require("eslint");
const myRule = require("../rules/no-import-from-top.js");

const ruleTester = new RuleTester({});

ruleTester.run("my-rule", myRule, {
  valid: [
    {
      filename: "@src/app/OneProduct/OneProductPage.tsx",
      code: "import OneProductPage from '../pages/OneProduct/OneProductPage';",
    },
  ],
  invalid: [
    {
      filename: "@src/shared/OneProduct/OneProductPage.tsx",
      code: "import OneProductPage from '../pages/OneProduct/OneProductPage';",
      errors: [{ messageId: "messageIdForSomeFailure" }],
    },
  ],
});
