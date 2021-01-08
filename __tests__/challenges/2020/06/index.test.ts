import { readFileSync } from 'fs';
import * as path from 'path';

import { run } from '../../../../src/challenges/2020/06';

const input = readFileSync(path.join(__dirname, '../../../../src/inputs/2020/06/input'), 'utf8').trim();

describe('Year 2020, Challenge 06', () => {
  it('solves all parts of the challenge', () => {
    expect(run(input)).toStrictEqual(['6782', '3596']);
  });
});
