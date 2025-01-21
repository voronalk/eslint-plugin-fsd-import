import { TSESLint } from "@typescript-eslint/utils";
import { getLayer, isAllowdToImportFrom } from "../utils";
import path from "path";

type Layer = "app" | "entities" | "features" | "pages" | "widgets" | "shared";

type MessageIds = "wrongImport";

const myRule: TSESLint.RuleModule<MessageIds> = {
  defaultOptions: [],
  meta: {
    type: "problem",
    messages: {
      wrongImport:
        "You are not allowed to import from {{fromLayer}} layer to {{toLayer}} layer",
    },
    schema: [],
  },
  create: (context) => {
    const availableLayers = {
      app: "app",
      entities: "entities",
      features: "features",
      pages: "pages",
      widgets: "widgets",
      shared: "shared",
    };
    return {
      ImportDeclaration(node) {
        const fileName = context.filename;
        const fromPath = node.source.value;

        const currentLayer = getLayer(fileName) as Layer;
        const importLayer = getLayer(fromPath) as Layer;

        if (!currentLayer || !importLayer) {
          return;
        }

        node.specifiers.forEach((specifier) => {
          if (
            specifier.type === "ImportSpecifier" &&
            specifier.importKind === "type"
          ) {
            return;
          }

          if (!availableLayers[importLayer] || !availableLayers[currentLayer]) {
            return;
          }

          if (!isAllowdToImportFrom(currentLayer, importLayer)) {
            context.report({
              node,
              messageId: "wrongImport",
              data: {
                fromLayer: importLayer,
                toLayer: currentLayer,
              },
            });
          }
        });
      },
    };
  },
};

export default myRule;
