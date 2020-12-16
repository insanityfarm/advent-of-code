import { program } from 'commander';
import * as fs from 'fs';
import { Answers, ChoiceCollection, prompt } from 'inquirer';
import * as path from 'path';

program.version('0.0.1').description('My solutions for the Advent of Code challenge');

program
  .option('-d, --debug', 'output extra debugging')
  .option('-l, --latest', 'run the solution for the latest challenge');

program.parse(process.argv);

if (program.debug) {
  console.log(program.opts());
}

const main = async () => {
  const challengesDir = path.join(__dirname, './challenges/');
  const yearChoices: ChoiceCollection = fs
    .readdirSync(challengesDir)
    .sort((a, b) => b.localeCompare(a))
    .map((year, i) => ({
      name: i === 0 ? `${year} (Latest)` : year,
      value: year,
    }));
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { year }: Answers = await prompt([
    {
      name: 'year',
      message: 'Select a Year',
      type: 'list',
      choices: yearChoices,
    },
  ]);
  const dayChoices: ChoiceCollection = fs
    .readdirSync(path.join(challengesDir, year))
    .sort((a, b) => b.localeCompare(a))
    .map((day, i) => ({
      name: i === 0 ? `${day} (Latest)` : day,
      value: day,
    }));
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { day }: Answers = await prompt([
    {
      name: 'day',
      message: 'Select a Day',
      type: 'list',
      choices: dayChoices,
    },
  ]);
  console.log(day);
};

void main();
