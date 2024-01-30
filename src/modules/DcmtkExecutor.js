const { exec } = require('child_process');

class DcmtkExecutor {
  constructor(dcmtkPath, dcmtkTool) {
    this.dcmtkPath = dcmtkPath
      ? dcmtkPath.endsWith('/')
        ? dcmtkPath
        : dcmtkPath + '/'
      : '';
    this.dcmtkTool = dcmtkTool;
  }

  execute(args) {
    return new Promise((resolve, reject) => {
      const fullPath = `${this.dcmtkPath}${this.dcmtkTool}`;
      const commandLine = fullPath + ' ' + args.join(' ');
      //console.log('x: ', commandLine);
      exec(commandLine, (error, stdout, stderr) => {
        if (error) {
          console.error(`Erro de execução: ${error}`);
          reject(error); // Rejeita a Promise se ocorrer um erro
          return;
        }
        if (stderr) {
          console.info(`stderr: ${stderr}`);
        }
        resolve(stdout); // Resolve a Promise com o stdout se não houver erro
      });
    });
  }
}

module.exports = DcmtkExecutor;
