Schemas.Imagefile = Object.assign({}, FilesCollection.schema, {
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

Imagefiles = new FilesCollection({
  collectionName: 'Imagefiles',
  schema: Schemas.Imagefile,
  allowClientCode: true, // Required to let you remove uploaded file
  storagePath: '/data/Meteor/uploads/imagefiles', //persistent testing file storage
  onBeforeUpload(file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.ext)) {
      return true;
    } else {
      return 'Please upload image, with size equal or less than 10MB';
    }
  }
});

export default Imagefiles;
