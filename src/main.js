const DcmtkExecutor = require('./modules/DcmtkExecutor');
const { findDcmtkPath } = require('./modules/findDcmtkPath');

// Obtém o caminho do DCMTK
const dcmtkPath = findDcmtkPath();

// Cria uma instância de DcmtkExecutor com o caminho obtido
const dcmtkExecutor = new DcmtkExecutor(dcmtkPath);

// Define o comando DCMTK a ser executado e os argumentos
const command = 'dcmdump'; // Substitua 'dcmdump' pelo comando DCMTK que você deseja executar
const args = ['--version']; // Substitua '--version' pelos argumentos reais para o seu comando

// Executa o comando usando DcmtkExecutor
dcmtkExecutor.execute(command, args, (err, result) => {
  if (err) {
    console.error('Erro ao executar o comando DCMTK:', err);
  } else {
    console.log('Resultado do comando DCMTK:', result);
  }
});
