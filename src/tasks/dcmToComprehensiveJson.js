const DcmtkExecutor = require('../modules/DcmtkExecutor');
const findDcmtkPath = require('../utils/findDcmtkPath');

const dcm2json = new DcmtkExecutor(findDcmtkPath(), 'dcm2json');

async function dcmToComprehensiveJson(path) {
  const comprehensiveJson = {};
  try {
    const dcmJson = await dcm2json.execute([path, '+fc']);
    const dcmObject = JSON.parse(dcmJson);
    comprehensiveJson.PatientName = dcmObject['00100010'].Value[0].Alphabetic;
    comprehensiveJson.AccessionNumber = dcmObject['00080050'].Value[0];
    comprehensiveJson.PatientID = dcmObject['00100020'].Value[0];
    comprehensiveJson.PatientBirthDate = dcmObject['00100030'].Value[0];
    comprehensiveJson.RequestedProcedureDescription =
      dcmObject['00321060'].Value[0];
    comprehensiveJson.fullPathWorklistFile = path;
    return comprehensiveJson;
  } catch (err) {
    console.log(err);
  }
}

module.exports = dcmToComprehensiveJson;
