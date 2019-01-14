import SimpleSchema from 'simpl-schema';

Schemas.Image = Object.assign({}, FilesCollection.schema, {
  studyId: {
    type: String,
    optional: true,
  },
  width: {
    type: Number,
    optional: true,
  },
  height: {
    type: Number,
    optional: true,
  },
  fileWidth: {
    type: Number,
    optional: true,
    autoform: {
      type: 'hidden',
    },
  },
  fileHeight: {
    type: Number,
    optional: true,
    autoform: {
      type: 'hidden',
    },
  },
});

Images = new FilesCollection({
  collectionName: 'Images',
  schema: Schemas.Image,
  allowClientCode: true, // Required to let you remove uploaded file
  storagePath: '/data/Meteor/uploads/images', //persistent testing file storage
});

Images.collection.attachSchema(new SimpleSchema(Schemas.Image));

// if(Meteor.isServer) {
//   Images.allow({
//     insert: function(userId, doc) {
//       return true;
//     },
//     update: function(userId, doc) {
//       return true;
//     },
//     remove: function(userId, doc) {
//       return true;
//     },
//   });
// }

export default Images;
