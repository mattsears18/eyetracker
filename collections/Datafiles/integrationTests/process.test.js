describe('INTEGRATION Datafile.process()', () => {
  it('processes an iMotions datafile', async () => {
    const study = Factory.create('study');
    let datafile = Factory.create('imotionsDatafile', {
      studyId: study._id,
    });
    datafile = await datafile.process();

    expect(datafile.headersRemoved).to.be.true;
    expect(datafile.participantId).to.exist;
    expect(datafile.fileFormat).to.equal('imotions');
    expect(datafile.rawRowCount).to.equal(12271);
    expect(datafile.blinkCount).to.equal(0);
    expect(datafile.saccadeCount).to.equal(0);
    expect(datafile.gazepointCount).to.equal(3218);
    expect(datafile.fixationCount).to.equal(155);
    expect(datafile.status).to.equal('processed');

    const participant = Participants.findOne({ _id: datafile.participantId });
    expect(participant.datafileIds).to.eql([datafile._id]);
  });

  it('processes an SMI datafile', async () => {
    const study = Factory.create('study');
    let datafile = Factory.create('smiDatafile', {
      studyId: study._id,
    });
    datafile = await datafile.process();

    expect(datafile.headersRemoved).to.be.true;
    expect(datafile.participantId).to.exist;
    expect(datafile.fileFormat).to.equal('smi');
    expect(datafile.rawRowCount).to.equal(12742);
    expect(datafile.blinkCount).to.equal(13);
    expect(datafile.saccadeCount).to.equal(190);
    expect(datafile.gazepointCount).to.equal(2948);
    expect(datafile.fixationCount).to.equal(205);
    expect(datafile.status).to.equal('processed');

    const participant = Participants.findOne({ _id: datafile.participantId });
    expect(participant.datafileIds).to.eql([datafile._id]);
  });

  it('processes an SMI datafile with multiple stimuli', async () => {
    const study = Factory.create('study');
    let datafile = Factory.create('smiMultiDatafile', {
      studyId: study._id,
    });
    datafile = await datafile.process();

    expect(datafile.headersRemoved).to.be.true;
    expect(datafile.participantId).to.exist;
    expect(datafile.fileFormat).to.equal('smi');
    expect(datafile.rawRowCount).to.equal(146558);
    expect(datafile.blinkCount).to.equal(14);
    expect(datafile.saccadeCount).to.equal(1551);
    expect(datafile.gazepointCount).to.equal(32231);
    expect(datafile.fixationCount).to.equal(1813);
    expect(datafile.status).to.equal('processed');

    const participant = Participants.findOne({ _id: datafile.participantId });
    expect(participant.datafileIds).to.eql([datafile._id]);
  }).timeout(10000);
});
