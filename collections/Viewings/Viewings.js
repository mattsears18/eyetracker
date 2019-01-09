import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

Viewings = new Mongo.Collection('viewings');

Viewings.allow({
  insert: function(userId, doc) {
    return true;
    if(!Roles.userIsInRole(userId, 'create', 'viewings')) {
      throw new Meteor.Error('viewings.create.unauthorized',
        'You do not have permission to create viewings.');
    } else {
      return true;
    }
  },
  update: function(userId, doc) {
    return true;
    viewing = Viewings.findOne({_id: doc._id});
    return viewing.hasPermission('update');
  },
  remove: function(userId, doc) {
    return true;
    viewing = Viewings.findOne({_id: doc._id});
    return viewing.hasPermission('destroy');
  },
});

Schemas.Viewing = new SimpleSchema({
  analysisId: {
    type: String,
  },
  datafileId: {
    type: String,
  },
  aoiId: {
    type: String,
  },
  number: {
    type: Number,
    label: 'Number',
  },
  recordingIds: {
    type: Array,
  },
  "recordingIds.$": {
    type: String,
    autoform: {
      type: 'hidden',
    },
  },
  minRecordingTime: {
    type: Number,
    label: 'Minimum Recording Time',
    optional: true,
    autoform: {
      type: 'hidden',
    },
  },
  maxRecordingTime: {
    type: Number,
    label: 'Maximum Recording Time',
    optional: true,
    autoform: {
      type: 'hidden',
    },
  },
  duration: {
    type: Number,
    label: 'Duration',
    optional: true,
    autoform: {
      type: 'hidden',
    },
  },
  viewingsComplete: {
    type: String,
    label: 'Viewings Complete',
    autoform: {
      type: 'hidden',
    },
    optional: true,
  },
  averageSlideHullSize: {
    type: Number,
    optional: true,
    autoform: {
      type: 'hidden',
    },
  },
}, {tracker: Tracker});

Viewings.attachSchema(Schemas.Viewing);

export default Viewings;
