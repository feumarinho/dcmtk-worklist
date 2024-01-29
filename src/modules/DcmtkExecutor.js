const { exec } = require('child_process');

class DcmtkExecutor {
  constructor(dcmtkPath) {
    this.dcmtkPath = dcmtkPath
      ? dcmtkPath.endsWith('/')
        ? dcmtkPath
        : dcmtkPath + '/'
      : '';
  }

  execute(command, args, callback) {
    const fullPath = `${this.dcmtkPath}${command}`;
    const commandLine = fullPath + ' ' + args.join(' ');
    console.log('Executando: ', commandLine);
    console.log('');
    exec(commandLine, (error, stdout, stderr) => {
      if (error) {
        console.error(`Erro de execução: ${error}`);
        return callback(error, null);
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
      }
      callback(null, stdout);
    });
  }
}

module.exports = DcmtkExecutor;
