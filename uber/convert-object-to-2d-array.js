// Question1 : Implement a stack with Javascript
let stack = [];

stack.push(1);

stack.pop(2);

// Question : Implement a queue with Javascript
let queue = [];

queue.push(1);
queue.push(2);

queue.shift();

// Question 3 : Take a list / array of objects with each object having the following information:
//              - from - string of city
//              - to - string of city
//              - value - number representing say distance, number of rides, or cost of a trip
// There are no object values that map from -> to same city, i.e., see distance variable

// Transform it into 2D-array/matrix where each cell is the distance value.
//    - identify dimensions because from and to list has at most n-1 items and we need n dimensions
//      - because no SF -> SF.  the missing dimension values can be gotten from the 'to' field
//    - create the nxn array, initialize it, and put the value into it

/*
     SF  SAC SLT LA
SF   0   88  188 384
SAC  88  0   104 386
SLT  188 104 0   487
LA   384 386 487 0
*/

const distance = [{
 from: "SF",
 to: "SAC",
 value: 88
}, {
 from: "SF",
 to: "SLT",
 value: 188
}, {
 from: "SF",
 to: "LA",
 value: 384
}, {
 from: "SAC",
 to: "SLT",
 value: 104
}, {
 from: "SAC",
 to: "LA",
 value: 386
}, {
 from: "SLT",
 to: "LA",
 value: 487
}];


let citiesSet = new Set();

for(let i = 0; i < distance.length; i++) {
    let { from, to } = distance[i];
    
    citiesSet.add(from);
    citiesSet.add(to);
}

let cities = [...citiesSet];

var result = Array(4);

for(let f = 0; f < cities.length; f++) {
    result[f] = Array(4);
    
    for(let t = 0; t < cities.length; t++) {
        let fromCity = cities[f];
        let toCity = cities[t];
        
        let distanceResult = distance.find(v => v.from == fromCity && v.to == toCity) || distance.find(v => v.to == fromCity && v.from == toCity);
        
        let d = distanceResult && distanceResult.value || 0;

        result[f][t] = d;
    }
}

console.log(result);

Output:
[ [ 0, 88, 188, 384 ],
  [ 88, 0, 104, 386 ],
  [ 188, 104, 0, 487 ],
  [ 384, 386, 487, 0 ] ]
