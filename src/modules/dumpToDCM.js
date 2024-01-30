const tmp = require('tmp-promise');
const fs = require('fs').promises; // Use a API de promessas do módulo fs

const DcmtkExecutor = require('./DcmtkExecutor');
const WorklistDump = require('./WorklistDump');
const { findDcmtkPath } = require('./findDcmtkPath');

const dump2dcm = new DcmtkExecutor(findDcmtkPath(), 'dump2dcm');

async function ensureDirectoryExists(directory) {
  try {
    await fs.access(directory); // Tenta acessar o diretório para verificar se ele existe
  } catch (error) {
    await fs.mkdir(directory, { recursive: true }); // Cria o diretório se ele não existir
    console.log(`Diretório ${directory} criado.`);
  }
}

async function dump2DCM(data, out) {
  // Garante que o diretório do caminho de saída exista
  const outDirectory = require('path').dirname(out);
  await ensureDirectoryExists(outDirectory);

  const dcmDump = new WorklistDump(data).generateDicomText();

  try {
    const o = await tmp.file();
    await fs.writeFile(o.path, dcmDump);

    await dump2dcm.execute([o.path, out]);

    o.cleanup();
  } catch (error) {
    console.error('Erro:', error);
  }
}

module.exports = { dump2DCM };
