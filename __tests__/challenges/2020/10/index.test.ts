import { readFileSync } from 'fs';
import * as path from 'path';

import { run } from '../../../../src/challenges/2020/10';

const input = readFileSync(path.join(__dirname, '../../../../src/inputs/2020/10/input'), 'utf8').trim();

describe('Year 2020, Challenge 10', () => {
  it('solves all parts of the challenge', () => {
    expect(run(input)).toStrictEqual(['2048', '1322306994176']);
  });
});
