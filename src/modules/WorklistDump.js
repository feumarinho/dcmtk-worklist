class DicomTextGenerator {
  constructor(params) {
    this.params = params;
  }

  generateDicomText() {
    const {
      AccessionNumber = '',
      ReferringPhysicianName = '',
      PatientName = '',
      PatientID = '',
      PatientBirthDate = '',
      PatientSex = '',
      PatientSize = '',
      PatientWeight = '',
      RequestedProcedureDescription = '',
      Modality = '',
      ScheduledProcedureStepStartDate = '',
      ScheduledProcedureStepStartTime = '',
      ScheduledPerformingPhysicianName = '',
      ScheduledProcedureStepDescription = '',
      RequestedProcedureID = '',
    } = this.params;

    const dicomText = `# Dicom-File-Format
# Dicom-Data-Set
# Used TransferSyntax: Little Endian Explicit
(0008,0005) CS [ISO_IR 192]                             #  10, 1 SpecificCharacterSet
(0008,0050) SH [${AccessionNumber}]                           #  12, 1 AccessionNumber
(0008,0090) PN [${ReferringPhysicianName}]                              #  10, 1 ReferringPhysicianName
(0010,0010) PN [${PatientName}]                    #  20, 1 PatientName
(0010,0020) LO [${PatientID}]                                  #   6, 1 PatientID
(0010,0030) DA [${PatientBirthDate}]                               #   8, 1 PatientBirthDate
(0010,0040) CS [${PatientSex}]                                      #   2, 1 PatientSex
(0010,1020) DS [${PatientSize}]                                    #   4, 1 PatientSize
(0010,1030) DS [${PatientWeight}]                                     #   2, 1 PatientWeight
(0032,1060) LO [${RequestedProcedureDescription}]           #  28, 1 RequestedProcedureDescription
(0040,0100) SQ (Sequence with explicit length #=1)      # 152, 1 ScheduledProcedureStepSequence
  (fffe,e000) na (Item with explicit length #=6)          # 144, 1 Item
    (0008,0060) CS [${Modality}]                                     #   2, 1 Modality
    (0040,0002) DA [${ScheduledProcedureStepStartDate}]                               #   8, 1 ScheduledProcedureStepStartDate
    (0040,0003) TM [${ScheduledProcedureStepStartTime}]                                 #   6, 1 ScheduledProcedureStepStartTime
    (0040,0006) PN [${ScheduledPerformingPhysicianName}]  #  38, 1 ScheduledPerformingPhysicianName
    (0040,0007) LO [${ScheduledProcedureStepDescription}]           #  28, 1 ScheduledProcedureStepDescription
  (fffe,e00d) na (ItemDelimitationItem for re-encoding)   #   0, 0 ItemDelimitationItem
(fffe,e0dd) na (SequenceDelimitationItem for re-encod.) #   0, 0 SequenceDelimitationItem
(0040,1001) SH [${RequestedProcedureID}]                               # RequestedProcedureID`;

    return dicomText;
  }
}

module.exports = DicomTextGenerator;
