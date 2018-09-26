// -----------------------
//  FileService
// -----------------------
  
/**
 * @constructor
 * @param {Object} database
 */
function FileService(database, delay) {
  this.database = database;
  this.delay = delay;
}
  
/**
 * @this FileService
 * @param {string} id
 * @returns {Object|undefined}
 */
FileService.prototype.getFile = function(id) {
  return this.database[id];
}

/**
 * Return the file object asynchronously with delay
 *
 * @this FileService
 * @param {string} id
 */
FileService.prototype.getFileAsync = function(id) {
  // NOTE: You may add parameters if desired
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {   
      resolve(this.getFile(id));
    }, this.delay);
  });
}

//
  
var fileServices = [
  new FileService({
    '1': {name: 'A1',   type: 'txt', size: 200},
    '2': {name: 'A100', type: 'png', size: 200},
    '3': {name: 'A10',  type: 'mp3', size: 200},
  }, 200),
  new FileService({
    '1': {name: 'A999',   type: 'txt', size: 200},
    '4': {name: 'A2',   type: 'pdf', size: 50},
    '5': {name: '07',   type: 'doc', size: 200},
  }, 1000),
];
  
/**
 * @param {FileService[]} fileServices
 * @param {string[]} ids
 */
function printFilesAsyncFromServices(fileServices, ids) {
  // Should print out, with order preserved:
  // [
  //   { name: 'A100', type: 'png', size: 200 },
  //   { name: 'A10',  type: 'mp3', size: 200 },
  //   { name: 'A1',   type: 'txt', size: 200 },
  //   { name: 'A2',   type: 'pdf', size: 50  }
  // ]
  
 // TODO
  const promises = [];
  
  ids.forEach(id => {
    // id is file id
    // promises.push(fileService.getFileAsync(id));  
    let finalResult = new Promise(resolve => {
      let idPromises = [];
      
      fileServices.forEach(fileService => {
        idPromises.push(fileService.getFileAsync(id));
      });
      
      Promise.all(idPromises).then(results => {
        resolve(results.filter(result => result !== undefined)[0]);
      });
    });
    
    promises.push(finalResult);
  });
  
  Promise.all(promises).then(results => {
    console.log(results.filter(result => result !== undefined)); 
  });
  
}
  
// printFilesAsyncFromServices(fileServices, ['1', '4']);

// instances = [
//  Promise_to_get_file_1
//  Promise_to_get_file_4
// ]

printFilesAsyncFromServices(fileServices, ['2', '3', '1', '7', '4']);
