interface Passport {
  byr?: string;
  iyr?: string;
  eyr?: string;
  hgt?: string;
  hcl?: string;
  ecl?: string;
  pid?: string;
  cid?: string;
}
type InputData = Passport[];

const requiredFields = [
  { name: 'byr', validator: (val = '') => val.length === 4 && Number(val) >= 1920 && Number(val) <= 2002 },
  { name: 'iyr', validator: (val = '') => val.length === 4 && Number(val) >= 2010 && Number(val) <= 2020 },
  { name: 'eyr', validator: (val = '') => val.length === 4 && Number(val) >= 2020 && Number(val) <= 2030 },
  {
    name: 'hgt',
    validator: (val = '') => {
      const [height, unit] = [val.slice(0, -2), val.slice(-2)];
      switch (unit) {
        case 'cm':
          return Number(height) >= 150 && Number(height) <= 193;
        case 'in':
          return Number(height) >= 59 && Number(height) <= 76;
      }
      return false;
    },
  },
  { name: 'hcl', validator: (val = '') => /^#[0-9A-F]{6}$/i.test(val) },
  { name: 'ecl', validator: (val = '') => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(val) },
  { name: 'pid', validator: (val = '') => val.length === 9 && !isNaN(Number(val)) },
];

function formatInput(input: string): InputData {
  const regex = /\n| /gi;
  return input.split('\n\n').map(e => {
    const fields: string[] = e.split(regex);
    const passport: Passport = {};
    for (const field of fields) {
      const [key, val] = field.split(':');
      passport[key] = val;
    }
    return passport;
  });
}

function validatePassports(passports: InputData, shouldValidateValues = false): number {
  let validCount = passports.length;
  for (const passport of passports) {
    const fields = Object.getOwnPropertyNames(passport);
    let isValid = true;
    for (const requiredField of requiredFields) {
      const { name, validator } = requiredField;
      if (!fields.includes(name) || (shouldValidateValues && !validator(passport[name]))) {
        isValid = false;
        break;
      }
    }
    !isValid && validCount--;
  }
  return validCount;
}

export function run(input: string): string[] {
  const data = formatInput(input);
  return [`${validatePassports(data)}`, `${validatePassports(data, true)}`];
}
