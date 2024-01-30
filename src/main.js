const path = require('path');

const config = require('./config/config');
const { dump2DCM } = require('./modules/dumpToDCM');

const params = {
  AccessionNumber: '1010C1R891P1',

  PatientName: 'TESTE DE DAEMON DOI',
  PatientID: 'L1946',
  PatientBirthDate: '19861210',
  PatientSex: 'F',
  PatientSize: '1.9',
  PatientWeight: '90',
  RequestedProcedureDescription: 'ECOCARDIOGRAMA TRANSTORACICO',
  Modality: 'US',
  ScheduledProcedureStepStartDate: '20230821',
  ScheduledProcedureStepStartTime: '000000',
  ScheduledPerformingPhysicianName: 'DR. FILIPE JOSE COSTA MARINHO RIBEIRO',
  ScheduledProcedureStepDescription: 'ECOCARDIOGRAMA TRANSTORACICO',
  RequestedProcedureID: '01',
};

dump2DCM(params, path.join(config.outFilePath, `${params.AccessionNumber}.wl`));
