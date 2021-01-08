import { readFileSync } from 'fs';
import * as path from 'path';

import { run } from '../../../../src/challenges/2020/01';

const input = readFileSync(path.join(__dirname, '../../../../src/inputs/2020/01/input'), 'utf8').trim();

describe('Year 2020, Challenge 01', () => {
  it('solves all parts of the challenge', () => {
    expect(run(input)).toStrictEqual(['545379', '257778836']);
  });
});
