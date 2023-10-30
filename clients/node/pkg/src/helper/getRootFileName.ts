import { dirname, relative } from "path";
import getRootFilePath from "./getRootFilePath";

export default function getRootFileName(fileName: string): string | null {
  if (typeof fileName !== "string") {
    return null;
  } else if (fileName.startsWith("file:/")) {
    const url = new URL(fileName);
    return url.pathname;
  } else {
    const rootPath = dirname(getRootFilePath());
    return relative(rootPath, fileName);
  }
}
