export default function getRootFilePath() {
  let argv = process?.argv;
  if (argv === undefined) return "";
  for (const arg of argv) {
    if (typeof arg !== "string" || arg.startsWith("-")) {
      break;
    }
    if (arg.endsWith(".js") || arg.endsWith(".ts")) {
      return arg;
    }
  }
  return "";
}
