import { readFileSync } from 'fs';
import * as path from 'path';

import { run } from '../../../../src/challenges/2020/08';

const input = readFileSync(path.join(__dirname, '../../../../src/inputs/2020/08/input'), 'utf8').trim();

describe('Year 2020, Challenge 08', () => {
  it('solves all parts of the challenge', () => {
    expect(run(input)).toStrictEqual(['2003', '1984']);
  });
});
