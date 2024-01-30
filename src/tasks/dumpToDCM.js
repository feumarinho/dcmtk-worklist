const tmp = require('tmp-promise');
const fs = require('fs').promises;
const path = require('path');

const DcmtkExecutor = require('../modules/DcmtkExecutor');
const WorklistDump = require('../modules/WorklistDump');
const findDcmtkPath = require('../utils/findDcmtkPath');
const ensureDirectoryExists = require('../utils/ensureDirectoryExists');

async function dump2DCM(data, out) {
  const dump2dcm = new DcmtkExecutor(findDcmtkPath(), 'dump2dcm');

  // Garante que o diretório do caminho de saída exista
  const outDirectory = path.dirname(out);
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

module.exports = dump2DCM;
