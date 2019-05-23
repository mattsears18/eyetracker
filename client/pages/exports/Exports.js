Template.Exports.onCreated(function() {
  this.exportType = ReactiveVar();
  this.analysisId = ReactiveVar();
  this.analysisSelectorVisible = new ReactiveVar(false);
  this.downloadButtonVisible = new ReactiveVar(false);
  this.samplingRateVisible = new ReactiveVar(false);
  this.samplingRate = new ReactiveVar(100);

  this.autorun(() => {
    if (this.analysisId.get()) {
      this.subscribe('viewings.byAnalysisId', this.analysisId.get());
    }
  });
});

Template.Exports.helpers({
  analysisSelectorVisible: () => Template.instance().analysisSelectorVisible.get(),
  downloadButtonVisible: () => Template.instance().downloadButtonVisible.get(),
  samplingRateVisible: () => Template.instance().samplingRateVisible.get(),
  samplingRate: () => Template.instance().samplingRate.get(),
});

Template.Exports.events({
  'change .export-type': (event, templateInstance) => {
    const exportType = event.target.value;
    templateInstance.exportType.set(event.target.value);

    if (
      exportType === 'allParticipantsSingle'
      || exportType === 'allParticipantsIndividual'
      || exportType === 'allViewingsSingle'
      || exportType === 'allViewingsIndividual'
    ) {
      templateInstance.analysisSelectorVisible.set(true);
    } else {
      templateInstance.analysisSelectorVisible.set(false);
    }
  },
  'change .analysis-selector, change .export-type': (
    event,
    templateInstance,
  ) => {
    const analysisId = $('.analysis-selector')
      ? $('.analysis-selector').val()
      : undefined;

    templateInstance.analysisId.set(analysisId);

    if (
      templateInstance.exportType.get() === 'allViewingsSingle'
      || templateInstance.exportType.get() === 'allViewingsIndividual'
    ) {
      templateInstance.samplingRateVisible.set(true);
    } else {
      templateInstance.samplingRateVisible.set(false);
    }

    if (templateInstance.analysisId.get()) {
      templateInstance.downloadButtonVisible.set(true);
    } else {
      templateInstance.downloadButtonVisible.set(false);
    }
  },
  'change .sampling-rate': (event, templateInstance) => {
    templateInstance.samplingRate.set(event.target.value);
  },
  'click .download-button': (event, templateInstance) => {
    console.log(templateInstance.exportType.get());

    if (templateInstance.analysisId.get()) {
      const analysis = Analyses.findOne({
        _id: templateInstance.analysisId.get(),
      });

      if (templateInstance.exportType.get() === 'allParticipantsSingle') {
        console.log('analysis.saveCSVParticipants()');
        analysis.saveCSVParticipants();
        // } else if (
        //   templateInstance.exportType.get() === 'allParticipantsIndividual'
        // ) {
        //   console.log('analysis.saveCSVParticipants({ individual: true })');
        //   analysis.saveCSVParticipants({
        //     individual: true,
        //   });
      } else if (templateInstance.exportType.get() === 'allViewingsSingle') {
        console.log('analysis.saveCSVParticipants()');
        analysis.saveCSVViewings();
      } else if (
        templateInstance.exportType.get() === 'allViewingsIndividual'
      ) {
        console.log('analysis.saveCSVParticipants({ individua: true })');
      }
    }
  },
});
