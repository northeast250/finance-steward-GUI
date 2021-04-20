import path from "path";

export const PROJECT_PATH =
  "/Users/mark/projects/finance-steward/finance-steward-GUI";

export const RESOURCE_PATH = path.resolve(PROJECT_PATH, "../resource");

export const DATA_DIR = path.resolve(PROJECT_PATH, "src/data");
export const LIBRARY_PATH = path.resolve(DATA_DIR, "library.json");
export const MARKS_DICT_PATH = path.resolve(DATA_DIR, "marks-dict.json");
export const MARK_TYPES_PATH = path.resolve(DATA_DIR, "mark-types.json");
