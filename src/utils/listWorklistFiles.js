const fs = require('fs');
const path = require('path');

function listWorklistFiles(directory, clientWorklist) {
  const userPath = path.join(directory, clientWorklist);

  return new Promise((resolve, reject) => {
    fs.readdir(userPath, (err, files) => {
      if (err) {
        reject(err);
        return;
      }

      const worklistFiles = files.filter(
        (file) => path.extname(file).toLowerCase() === '.wl',
      );
      resolve(worklistFiles);
    });
  });
}

module.exports = listWorklistFiles;
