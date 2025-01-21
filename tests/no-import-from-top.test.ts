import { RuleTester } from "@typescript-eslint/utils/dist/ts-eslint";
import myRule from "../src/rules/no-import-from-top";

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
});

ruleTester.run("my-rule", myRule, {
  valid: [
    {
      filename: "src/app/OneProduct/OneProductPage.tsx",
      code: "import OneProductPage from '../pages/OneProduct/OneProductPage';",
    },
  ],
  invalid: [
    {
      filename: "src/shared/OneProduct/OneProductPage.tsx",
      code: "import OneProductPage from '../pages/OneProduct/OneProductPage';",
      errors: [{ messageId: "messageIdForSomeFailure" }],
    },
  ],
});
