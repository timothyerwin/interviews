// Imagine we have an image. We’ll represent this image as a simple 2D array where every pixel is a 1 or a 0. The image you get is known to have a single rectangle of 0s on a background of 1s. 

// Write a function that takes in the image and returns the coordinates of the rectangle of 0’s -- either top-left and bottom-right; or top-left, width, and height.

var image = [
  [1, 0, 1, 1, 1, 1, 1],
  [1, 0, 0, 1, 0, 1, 1],
  [1, 1, 1, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 1],
  [1, 0, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 1, 1],
  [1, 1, 1, 0, 0, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
];

// Sample output:
// [
//     [[0,1],[1,1],[1,2]],
//     [[1,4],[2,3],[2,4],[2,5],[3,4]],
//     [[3,1],[4,1],[5,1],[5,2],[5,3],[5,4],[6,3],[6,4]
// ]


function subset(img, r, c, visited) {
  let results = [];
   
  if(r < 0 || c < 0 || r > img.length || c > img[0].length) {
    return;
  }
  
  
  if(visited[r][c]) {
    return;
  }
 
  if(img[r][c] == 0) {
    visited[r][c] = true;
    
    results.push([r,c]);
    
      
    results = results.concat(subset(img, r-1, c, visited));
    results = results.concat(subset(img, r+1, c, visited));
    results = results.concat(subset(img, r, c-1, visited));
    results = results.concat(subset(img, r, c+1, visited));
  }
  
  return results.filter(result => result);
  
}

// function getImageSize(img, r, c, visited) {
//   let w = 0;
//   let h = 0;
  
//   let rr = r;
  
  
//   while(rr < img.length) {
//     if(img[rr][c] == 0) {
//       visited[rr][c] = true;
        
//       h += 1;
//       rr += 1;
//     } else {
//       break;
//     }
//   }
  
//   let cc = c;
  
//   while(cc < img[r].length) {
//     if(img[r][cc] == 0) {
//         visited[r][cc] = true;
    
//         w += 1;
//         cc += 1;
//     } else {
//       break;
//     }
//   }
  
//   // visit all cells in the box
  
//   for(let rr = r; rr < (r + h); rr ++ ) {
//     for(let cc = c; cc < (c + w); cc ++ ) {
//       visited[rr][cc] = true;    
//     }
//   }
  
//   return { w, h };
// }

var process =(img)=>{
  
 const results = [];
  
 const visited = new Array(img.length);
  
 for(let r = 0; r < img.length; r++) {
  visited[r] = new Array(img[0].length).fill(false);
 }
   
 for(let r = 0; r < img.length; r++) {
   for(let c = 0; c < img[0].length; c++) {
    if(visited[r][c]) {
      continue;
    }
     
    if(img[r][c] == 0) {     
      const result = subset(img, r, c, visited);
      
      results.push(result);
    }
   }
 }

  return results;
}

console.log(process(image));
