import { Meteor } from 'meteor/meteor'

Schemas.Stimulusfile = Object.assign({}, FilesCollection.schema, {
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

path = Meteor.settings.public.uploads || '/data/Meteor/uploads';

Stimulusfiles = new FilesCollection({
  collectionName: 'Stimulusfiles',
  schema: Schemas.Stimulusfile,
  allowClientCode: true, // Required to let you remove uploaded file
  storagePath: path + '/stimulusfiles', //persistent testing file storage
  onBeforeUpload(file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.ext)) {
      return true;
    } else {
      return 'Please upload stimulus, with size equal or less than 10MB';
    }
  }
});

export default Stimulusfiles;
