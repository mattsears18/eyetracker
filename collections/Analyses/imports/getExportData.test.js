import '../../factories.test';
import { expect } from 'chai';
import { Factory } from 'meteor/dburles:factory';

describe('Analyses.getExportData()', () => {
  it('has no participants', () => {
    const analysis = Factory.create('analysis');
    expect(analysis.getExportData()).to.eql([]);
  });

  it('has a participant', () => {
    const glance = Factory.create('glanceWithGazepoints');

    const expectedFields = [
      'link',
      'study',
      'pointsType',
      'analysis',
      'minGlanceDuration',
      'maxGlanceGapDuration',
      'participant',
      'stimulus',
      'glanceNumber',
      'glanceDuration',
      'stimulusWidth',
      'stimulusHeight',
      'stimulusArea',
      'glanceStartTime',
      'glanceEndTime',
      'gazepointCount',
      'gazepointFrequency',
      'fixationCount',
      'fixationFrequency',
      'fixationProportion',
    ];

    // expect(glance.analysis().getExportData().length).to.equal(1);
    expect(Object.keys(glance.analysis().getExportData()[0])).to.eql(
      expectedFields,
    );
  }).timeout(60000);

  it('has a period', () => {
    const glance = Factory.create('glanceWithGazepoints');

    const expectedFields = [
      'link',
      'study',
      'pointsType',
      'analysis',
      'minGlanceDuration',
      'maxGlanceGapDuration',
      'period',
      'minTimestep',
      'includeIncomplete',
      'participant',
      'stimulus',
      'glanceNumber',
      'glanceDuration',
      'stimulusWidth',
      'stimulusHeight',
      'stimulusArea',
      'glanceStartTime',
      'glanceEndTime',
      'gazepointCount',
      'gazepointFrequency',
      'fixationCount',
      'fixationFrequency',
      'fixationProportion',
      'averageCoverage',
      'finalCoverage',
      'averageVelocity',
      'averageVelocityX',
      'averageVelocityY',
      'averageCentroidVelocity',
      'averageCentroidVelocityX',
      'averageCentroidVelocityY',
    ];

    expect(
      Object.keys(
        glance.analysis().getExportData({ period: 5000, timestep: 0 })[0],
      ),
    ).to.eql(expectedFields);
  }).timeout(60000);

  it('groups by participant', () => {
    const glance1 = Factory.create('glanceWithGazepoints', { number: 1 });
    Factory.create('glanceWithGazepoints', {
      studyId: glance1.studyId,
      analysisId: glance1.analysisId,
      participantId: glance1.participantId,
      stimulusId: glance1.stimulusId,
      number: 2,
    });
    Factory.create('glanceWithGazepoints', {
      studyId: glance1.studyId,
      analysisId: glance1.analysisId,
      participantId: glance1.participantId,
      stimulusId: glance1.stimulusId,
      number: 3,
    });

    const expectedFields = [
      'link',
      'study',
      'pointsType',
      'analysis',
      'maxGlanceGapDuration',
      'minGlanceDuration',
      'period',
      'minTimestep',
      'includeIncomplete',
      'participant',
      'glanceCount',
      'glanceDurations',
      'glanceDurationsMin',
      'glanceDurationsMax',
      'glanceDurationsSum',
      'glanceDurationsMean',
      'glanceDurationsMedian',
      'glanceDurationsPerStimulus',
      'glanceDurationsPerStimulusMin',
      'glanceDurationsPerStimulusMax',
      'glanceDurationsPerStimulusMean',
      'glanceDurationsPerStimulusMedian',
      'glanceCountsPerStimulus',
      'glanceCountsPerStimulusMin',
      'glanceCountsPerStimulusMax',
      'glanceCountsPerStimulusMean',
      'glanceCountsPerStimulusMedian',
      'gazepointCount',
      'gazepointFrequency',
      'fixationCount',
      'fixationFrequency',
      'fixationProportion',
      'averageCoverage',
      'finalCoverages',
      'finalCoveragesMin',
      'finalCoveragesMax',
      'finalCoveragesMean',
      'finalCoveragesMedian',
      'averageVelocity',
      'averageVelocityX',
      'averageVelocityY',
      'averageCentroidVelocity',
      'averageCentroidVelocityX',
      'averageCentroidVelocityY',
    ];

    expect(
      Object.keys(
        glance1.analysis().getExportData({
          period: 5000,
          timestep: 0,
          groupBy: 'participant',
        })[0],
      ),
    ).to.eql(expectedFields);
  }).timeout(60000);
});
