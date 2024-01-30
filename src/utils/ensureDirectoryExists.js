const fs = require('fs').promises; // Use a API de promessas do módulo fs

async function ensureDirectoryExists(directory) {
  try {
    await fs.access(directory); // Tenta acessar o diretório para verificar se ele existe
  } catch (error) {
    await fs.mkdir(directory, { recursive: true }); // Cria o diretório se ele não existir
    console.log(`Diretório ${directory} criado.`);
  }
}

module.exports = ensureDirectoryExists;
