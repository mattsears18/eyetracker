////////////////////////////////////////////////////////////////////////////////
// Participants Routes
////////////////////////////////////////////////////////////////////////////////
FlowRouter.route('/studies/:studyId/participants', {
  name: 'participants',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Participants'});
  }
});

FlowRouter.route('/studies/:studyId/participants/:participantId', {
  name: 'participant',
  action(params, queryParams) {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Participant'});
  }
});