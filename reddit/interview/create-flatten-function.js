/*
d = {
  'a': 5,
  'b': 6,
  'c': {
    'f': 9,
    'g': {
      'm': 17,
      'n': 3
    }
  }
}

flatten(d) = {
  'a': 5,
  'b': 6,
  'c.f': 9,
  'c.g.m': 17,
  'c.g.n': 3
}
*/

const d = {
  'a': 5,
  'b': 6,
  'c': {
    'f': 9,
    'g': {
      'm': 17,
      'n': 3
    }
  }
};

function flatten(o, accumulator = {}, prefix = '') {
  for(let p of Object.keys(o)) {
    const value = o[p];
    
    let prop = p;
    
    if(prefix) {
      prop = `${prefix}.${p}`;
    }
    
    if(prefix && prefix.length) {
      const prefixes = prefix.split('.');
      
      if(prefixes.length >= 3 && prefixes[1] === prefixes[2]) {
        throw Error('circular reference encountered.');
      }
    }
    
    
    if(value !== null && typeof(value) === 'object') {      
      flatten(value, accumulator, prefix ? `${prefix}.${p}` : p);
    } else {
      accumulator[prop] = value;
    }
  }
  
  return accumulator;
  
};

console.log(flatten(d));


const testNull = {
  'a': 5,
  'b': 6,
  'c': {
    'f': 9,
    'g': null
  }
};

console.log(flatten(testNull))

let circular = {
  x: 10,
};

circular.circular = circular;

const testCircular = {
  'a': 5,
  'b': 6,
  'c': {
    'f': 9,
    'g': null
  },
  circular
};

console.log(flatten(testCircular))

