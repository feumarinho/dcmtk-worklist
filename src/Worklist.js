const path = require('path');
const fs = require('fs').promises;

const listWorklistFiles = require('./utils/listWorklistFiles'); // Ajuste o caminho conforme necessário
const dcmToComprehensiveJson = require('./tasks/dcmToComprehensiveJson'); // Ajuste o caminho conforme necessário
const dump2DCM = require('./tasks/dumpToDCM');

class Worklist {
  constructor(directory, clientID) {
    this.directory = directory;
    this.clientID = clientID;
    this.fullPath = path.join(directory, `ECDWLST_${clientID}`);
  }

  async getWorklist() {
    try {
      // Listando os arquivos diretamente aqui
      const files = await listWorklistFiles(this.fullPath, '');
      const comprehensiveDataList = [];

      for (const file of files) {
        try {
          // Obtendo os dados DICOM diretamente aqui
          const comprehensiveData = await dcmToComprehensiveJson(
            path.join(this.fullPath, file),
          );
          comprehensiveDataList.push(comprehensiveData);
        } catch (err) {
          // Trata erro na leitura de dados DICOM de um arquivo específico
          return {
            msg: `Error extracting comprehensive data for file ${file}`,
            error: err,
          };
        }
      }

      return comprehensiveDataList;
    } catch (err) {
      // Trata erro na listagem de arquivos
      return {
        msg: 'Error getting worklist',
        error: err,
      };
    }
  }

  async addWorklistEntry(data) {
    // Define o caminho de saída padrão se não for fornecido
    const outputPath = path.join(this.fullPath, `${Date.now()}.wl`);

    try {
      // Chama a função dump2DCM importada, passando os dados e o caminho de saída
      await dump2DCM(data, outputPath);

      return { msg: 'DICOM file created successfully', file: outputPath };
    } catch (error) {
      console.error('Error:', error);
      return {
        msg: 'Error adding worklist entry',
        error,
      };
    }
  }

  async delWorklistEntry(index) {
    try {
      const worklist = await this.getWorklist();
      if (worklist.error) {
        // Verifica se existe um erro
        return worklist; // Retorna o erro se houver
      }

      if (index < 0 || index >= worklist.length) {
        return {
          msg: 'Invalid index for worklist entry',
          error: 'Index out of bounds',
        };
      }

      const fileToDelete = worklist[index].fullPathWorklistFile; // Certifique-se de que esta é a maneira correta de obter o caminho do arquivo
      await fs.unlink(fileToDelete);
      return { msg: 'File deleted successfully' };
    } catch (err) {
      return {
        msg: 'Error deleting worklist entry',
        error: err,
      };
    }
  }
}

module.exports = Worklist;
