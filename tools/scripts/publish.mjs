import { readCachedProjectGraph, createProjectGraphAsync } from "@nrwl/devkit";
import chalk from "chalk";
import { execSync } from "child_process";

function invariant(condition, message) {
  if (!condition) {
    console.error(chalk.bold.red(message));
    process.exit(1);
  }
}

const [, , name, tag = "next"] = process.argv;

await createProjectGraphAsync();
const graph = readCachedProjectGraph();
const project = graph.nodes[name];

invariant(
  project,
  `Could not find project "${name}" in the workspace. Is the project.json configured correctly?`
);

const outputPath = project.data?.targets?.build?.options?.outputPath;
invariant(
  outputPath,
  `Could not find "build.options.outputPath" of project "${name}". Is project.json configured correctly?`
);

process.chdir(outputPath);

console.log(chalk.bold.red("Using the --dry-run flag. Not actually publishing to npm..."));
execSync(`npm publish --access public --tag ${tag} --dry-run`);