const { execSync } = require('child_process');
const fs = require('fs');

function findDcmtkPath() {
  const paths = {
    win32: [
      'C:\\Program Files\\DCMTK\\bin',
      'C:\\Program Files (x86)\\DCMTK\\bin',
      // Adicione aqui o seu caminho para o binário do DCMTK
    ],
    darwin: [
      //MACOS
      '/Applications/DCMTK/bin',
      '/usr/local/bin',
      '/opt/homebrew/bin',
      // Adicione aqui o seu caminho para o binário do DCMTK
    ],
    linux: [
      '/usr/local/bin',
      '/usr/bin', // Locais comuns no Linux
      // Adicione aqui o seu caminho para o binário do DCMTK
    ],
  };

  const platform = process.platform;
  const possiblePaths = paths[platform] || [];

  for (const path of possiblePaths) {
    try {
      const files = fs.readdirSync(path);
      if (files.some((file) => file.startsWith('dcmtk'))) {
        // Verifica se algum arquivo começa com 'dcmtk'
        return path;
      }
    } catch (error) {
      // Ignora erros (diretório não existe, permissão negada, etc.)
    }
  }

  // Tentativa de encontrar usando comandos do sistema (Linux/macOS)
  if (platform === 'linux' || platform === 'darwin') {
    try {
      const result = execSync('which dcmdump').toString().trim();
      if (result) return result.replace(/\/dcmdump$/, ''); // Remove '/dcmdump' do caminho
    } catch (error) {
      console.log('DCMTK não encontrado');
    }
  }

  return null; // Retorna null se o DCMTK não for encontrado
}

module.exports = findDcmtkPath;
