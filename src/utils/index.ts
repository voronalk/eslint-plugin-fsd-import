const layers = {
  app: [
    "pages",
    "widgets",
    "features",
    "entities",
    "shared",
    "2pages",
    "3widgets",
    "4features",
    "5entities",
    "6shared",
  ],
  pages: [
    "widgets",
    "features",
    "entities",
    "shared",
    "3widgets",
    "4features",
    "5entities",
    "6shared",
  ],
  widgets: [
    "features",
    "entities",
    "shared",
    "4features",
    "5entities",
    "6shared",
  ],
  features: ["entities", "shared", "5entities", "6shared"],
  entities: ["entities", "shared", "6shared"],
  shared: ["shared"],
};

export function getLayer(path: string): string | null {
  const slices = ["app", "pages", "widgets", "features", "entities", "shared"];

  // Normalize the path to handle both relative and absolute imports
  const pathParts = path
    .replace(/^@src\//, "") // Remove the '@src/' prefix for absolute paths
    .replaceAll("../", "") // Remove the '../' prefix for relative paths
    .replaceAll("./", "") // Remove the './' prefix for relative paths
    .split("/"); // Split the path into its components

  // Only consider the first meaningful part of the path for slice matching
  const topLevelFolder = pathParts[0];

  // Check if the top-level folder matches a slice
  return slices.includes(topLevelFolder) ? topLevelFolder : null;
}

export function isAllowdToImportFrom(origin: string, target: string): boolean {
  const originLayer = origin as keyof typeof layers;
  return layers[originLayer]?.includes(target);
}
