import path from 'path';

// layer names and allowed imports
const layers = {
  app: ['pages', 'widgets', 'features', 'entities', 'shared'],
  pages: ['widgets', 'features', 'entities', 'shared'],
  widgets: ['features', 'entities', 'shared'],
  features: ['entities', 'shared'],
  entities: ['shared'],
  shared: [],
};

function getLayer(pathStr) {
  // Normalize the path to handle both relative and absolute imports
  const pathParts = pathStr
    .replace(/^@src\//, '') // Remove the '@src/' prefix for absolute paths
    .replace(/^@\//, '') // Remove the '@src/' prefix for absolute paths
    .replaceAll('../', '') // Remove the '../' prefix for relative paths
    .replaceAll('./', ''); // Remove the './' prefix for relative paths

  // Only consider the first meaningful part of the path for slice matching
  const topLevelFolder = pathParts.startsWith('/')
    ? pathParts.split('/')[1]
    : pathParts.split('/')[0];

  // Check if the top-level folder matches a slice
  return layers[topLevelFolder] ? topLevelFolder : null;
}

function isAllowdToImportFrom(origin, target) {
  return layers[origin]?.includes(target);
}

const myRule = {
  defaultOptions: [],
  meta: {
    type: 'problem',
    messages: {
      messageIdForSomeFailure:
        "Import from '{{importLayer}}' layer is not allowed in '{{currentLayer}}' layer.",
    },
    schema: [],
  },
  create: (context) => ({
    ImportDeclaration(node) {
      const absolutePath = context.filename;
      const importPath = node.source.value;

      // Convert to relative path
      const relativePath = path.relative(process.cwd(), absolutePath);

      // Remove src/ prefix if exists
      const normalizedPath = relativePath.replace(/^src\//, '');

      // Get layer names
      const currentLayer = getLayer(normalizedPath);
      const importLayer = getLayer(importPath);

      // If no layer name found, dont warn
      if (!currentLayer || !importLayer) {
        return;
      }

      // If import has type cpecifier, skip
      if (node.importKind === 'type') {
        return;
      }

      node.specifiers.forEach((specifier) => {
        // Allow to import types from top layers
        if (specifier.type === 'ImportSpecifier' && specifier.importKind === 'type') {
          return;
        }

        // If layers are not present in allowed layers, skip
        if (!layers[importLayer] || !layers[currentLayer]) {
          return;
        }

        // If import is not allowed, report
        if (!isAllowdToImportFrom(currentLayer, importLayer)) {
          context.report({
            node,
            messageId: 'messageIdForSomeFailure',
            data: {
              currentLayer,
              importLayer,
            },
          });
        }
      });
    },
  }),
};

export default myRule;
