# DCMTK-Worklist Library

## Overview

This JavaScript library for Node.js is specifically designed to facilitate the management of DICOM worklists files, making files management easier to work with the DCMTK's __wlmscpfs__ server. While the library provides comprehensive functionalities to add, index, and delete worklist entries based on filesystem, it's important to note that the management of the **wlmscpfs** server itself must be handled externally. The primary aim is to ease the complexities involved in managing DICOM worklists, enhancing efficiency in worklist management tasks.

## Prerequisites

Before you can use this library, you must have DCMTK installed on your system. DCMTK is a widely used open-source library for handling DICOM files and network communication.

## Installation

To install this library, run the following command in your terminal:

```bash
npm install github:feumarinho/dcmtk-worklist#main
```

## Usage

First, import the `Worklist` class from the library:

```javascript
const { Worklist } = require('dcmtk-worklist');
```

Then, create an instance of Worklist by specifying the path to your DICOM files and a client ID:

```javascript
const worklist = new Worklist('pathToFiles', clientID);
```

## Methods

**Adding a Worklist Entry**

To add a new entry to the worklist, use the **addWorklistEntry** method. Below is the format of the object along with the keys that can be utilized:

```javascript
worklist.addWorklistEntry({
  AccessionNumber: '',
  ReferringPhysicianName: '',
  PatientName: '',
  PatientID: '',
  PatientBirthDate: '',
  PatientSex: '',
  PatientSize: '',
  PatientWeight: '',
  RequestedProcedureDescription: '',
  Modality: '',
  ScheduledProcedureStepStartDate: '',
  ScheduledProcedureStepStartTime: '',
  ScheduledPerformingPhysicianName: '',
  ScheduledProcedureStepDescription: '',
  RequestedProcedureID: '',
});
```
**Retrieving Worklist Entries**

To get all entries from the worklist, use the getWorklist method:

```javascript
const entries = worklist.getWorklist();
```

**Deleting a Worklist Entry**

To delete an entry from the worklist by its index, use the **delWorklistEntry** method:

```javascript
worklist.delWorklistEntry(index);
```
> **Note:** Be cautious with the `delWorklistEntry` method, as deleting by index can lead to errors if the index is not properly managed.
