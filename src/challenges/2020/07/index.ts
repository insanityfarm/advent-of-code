interface ContentItem {
  qty: number;
  name: string;
}
interface InputData {
  [index: string]: ContentItem[];
}
interface EnclosingBags {
  [index: string]: boolean;
}

function camelize(str: string): string {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_x, chr: string) => chr.toUpperCase());
}

function formatInput(input: string): InputData {
  const rules = {} as InputData;
  input.split('\n').forEach(rule => {
    const [name, rawContentsString] = rule.split(' bags contain ');
    const rawContentItems = rawContentsString.split(', ');
    const contents: ContentItem[] | [null] = rawContentItems.map(rawContentItem => {
      if (rawContentItem === 'no other bags.') {
        return null;
      }
      const [rawItemQty, rawItemName] = rawContentItem.split(/^([^ ]+) /gi).slice(1, 3);
      const itemQty = Number(rawItemQty);
      const itemName = camelize(rawItemName.replace(/ bag(s?)(\.?)$/gi, ''));
      return {
        qty: itemQty,
        name: itemName,
      };
    });
    if (contents[0] !== null) {
      rules[camelize(name)] = contents;
    }
  });
  return rules;
}

function countEnclosingBags(enclosedBagName: string, rules: InputData): number {
  const name = camelize(enclosedBagName);
  const enclosingBags: EnclosingBags = {};
  let prevEnclosingBags: EnclosingBags = {};
  enclosingBags[name] = true;
  if (Object.prototype.hasOwnProperty.call(rules, name)) {
    while (Object.keys(prevEnclosingBags).length !== Object.keys(enclosingBags).length) {
      prevEnclosingBags = { ...enclosingBags };
      for (const ruleName in rules) {
        for (const contentItem of rules[ruleName]) {
          if (Object.prototype.hasOwnProperty.call(enclosingBags, contentItem.name)) {
            enclosingBags[ruleName] = true;
          }
        }
      }
    }
  }
  delete enclosingBags[name];
  return Object.keys(enclosingBags).length;
}

function countEnclosedBags(enclosingBagName: string, rules: InputData): number {
  let total = 0;
  let bagCountQueue = [camelize(enclosingBagName)];
  while (bagCountQueue.length > 0) {
    const bag = bagCountQueue.shift();
    if (Object.prototype.hasOwnProperty.call(rules, bag)) {
      for (const rule of rules[bag]) {
        total += rule.qty;
        bagCountQueue = bagCountQueue.concat(Array(rule.qty).fill(rule.name));
      }
    }
  }
  return total;
}

export function run(input: string): string[] {
  const data = formatInput(input);
  return [`${countEnclosingBags('shiny gold', data)}`, `${countEnclosedBags('shiny gold', data)}`];
}
