import helpers from '../../../lib/helpers';

fs = require('fs');

export default async function getGazepoints(opts) {
  const _data = opts && opts.data ? [...opts.data] : await this.getRenamedRows();

  this.rawRowCount = parseInt(_data.length, 10);

  let stimulusRows = [..._data];
  if (helpers.keyInArray('stimulusName', stimulusRows)) {
    stimulusRows = await this.getStimuliOnly(stimulusRows);
  }

  const integerRows = await this.getNumericPositiveCoordinatesOnly(
    stimulusRows,
  );
  this.integerRowCount = parseInt(integerRows.length, 10);

  let allGazepoints = [...integerRows];
  if (helpers.keyInArray('category', allGazepoints)) {
    allGazepoints = await this.getVisualIntakesOnly(allGazepoints);
  }
  this.gazepointCount = parseInt(allGazepoints.length, 10);

  Datafiles.update(
    { _id: this._id },
    {
      $set: {
        rawRowCount: this.rawRowCount,
        integerRowCount: this.integerRowCount,
        gazepointCount: this.gazepointCount,
      },
    },
  );

  return allGazepoints;
}
