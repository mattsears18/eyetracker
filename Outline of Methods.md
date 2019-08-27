# Analyses

# Datafiles

- [x] Datafiles.process() (async)
  - [x] .getRawCSV() (async)
  - [x] .preProcess(rawCsvData)
    - [x] .removeHeaders()
      - Works but still need tests
    - [x] .setFileFormat(rawCsvData)
      - [x] .detectFileFormat(rawCsvData)
    - [x] .getName()
  - [x] .makeEyeevents(rawCsvData) (async) (bulk insert is async)
    - [x] .getAssignedRows(rawCsvData)
      - [x] .getRenamedRows(rawCsvData)
      - [x] .getStimuliOnly(renamedRows)
      - [x] .getValidCoordinatesOnly(renamedRows)
      - [x] .filterSortFloat(field, data)
      - [x] .assignStimuli(sortedRows)
      - [x] .assignAois(rowsWithStimuli)
    - [x] .groupRowsByStimulus(assignedRows)
    - [x] .generateImotionsEyeevents(groupedRows)
    - [x] .generateSMIEyeevents(groupedRows)