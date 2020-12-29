import { program } from 'commander';
import { PathLike, readdirSync } from 'fs';
import { readFileSync } from 'fs';
import { Answers, prompt } from 'inquirer';
import * as path from 'path';

// TODO: Remove need for @typescript-eslint/no-unsafe-assignment bypasses in this file

program.version('0.0.1').description('My solutions for the Advent of Code challenge');

program
  .option('-d, --debug', 'output extra debugging')
  .option('-l, --latest', 'run the solution for the latest challenge');

program.parse(process.argv);

if (program.debug) {
  console.log(program.opts());
}

const inferOrPrompt = async (optionName: string, optionChoices: Array<Answers>) => {
  if (optionChoices.length === 1) {
    const [firstChoice] = optionChoices;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { [optionName]: firstChoice?.value };
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const response: Answers = await prompt([
    {
      name: optionName,
      message: `Select a ${optionName.charAt(0).toUpperCase() + optionName.slice(1)}`,
      type: 'list',
      choices: optionChoices,
    },
  ]);
  return response;
};

const getChoicesFromDir = (dir: PathLike) => {
  const answers: Answers[] = readdirSync(dir)
    .sort((a, b) => b.localeCompare(a))
    .map((item, i) => ({
      name: i === 0 ? `${item} (Latest)` : item,
      value: item,
    }));
  return answers;
};

const main = async () => {
  const challengesDir = path.join(__dirname, './challenges/');
  const inputsDir = path.join(__dirname, './inputs/');
  const yearChoices = getChoicesFromDir(challengesDir);
  const { year } = await inferOrPrompt('year', yearChoices);
  const dayChoices = getChoicesFromDir(path.join(challengesDir, year));
  const { day } = await inferOrPrompt('day', dayChoices);
  const startTime = Date.now();

  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  console.log(`Running solution for Advent of Code ${year}, day ${day}...\n`);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { run }: { run: (input: string) => void } = require(path.join(challengesDir, year, day));
  const input = readFileSync(path.join(inputsDir, year, day, 'input'), 'utf8');

  run(input);

  console.log(`\nFinished in ${Date.now() - startTime}ms.`);
};

void main();
