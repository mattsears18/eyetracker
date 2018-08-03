import { resetDatabase } from 'meteor/xolvio:cleaner';
import Schemas from '../../schemas';
import Studies from '../../../collections/Studies/Studies';
import Aois from '../../../collections/Aois/Aois';
import { renameHeaders,
         removeDuplicateIndices,
         getVisualIntakesOnly,
         getAoiId
       } from './process';

import shortSMITestDatafile from '../shortSMITestDatafile';
import mediumSMITestDatafile from '../mediumSMITestDatafile';

var faker = require('faker');

describe('Datafiles', function() {
  describe('.process() METEOR METHOD', function() {
    describe('can read short SMI test Datafile', function() {
      it('has 145 lines', function() {
        chai.expect(shortSMITestDatafile.length).to.equal(145);
      });
    });

    describe('can read medium SMI test Datafile', function() {
      it('has 15652 lines', function() {
        chai.expect(mediumSMITestDatafile.length).to.equal(15652);
      });
    });

    describe('Pre-process', function() {
      dataRenamed = renameHeaders(shortSMITestDatafile);

      describe('renameHeaders()', function() {
        it('renames SMI BeGaze default headings to correct headings', function() {
          expect(dataRenamed[0].hasOwnProperty('recordingTime')).to.be.true;
          expect(dataRenamed[0].hasOwnProperty('timeOfDay')).to.be.true;
          expect(dataRenamed[0].hasOwnProperty('category')).to.be.true;
          expect(dataRenamed[0].hasOwnProperty('index')).to.be.true;
          expect(dataRenamed[0].hasOwnProperty('x')).to.be.true;
          expect(dataRenamed[0].hasOwnProperty('y')).to.be.true;
          expect(dataRenamed[0].hasOwnProperty('aoiName')).to.be.true;
        });
      });

      dataUniqueIndices = removeDuplicateIndices(dataRenamed);

      describe('removeDuplicateIndices()', function() {
        it('short SMI test datafile has 22 unique indices', function() {
          expect(dataUniqueIndices.length).to.equal(22);
        });
      });

      describe('getVisualIntakesOnly()', function() {
        it('short SMI test datafile has 84 visual intakes', function() {
          expect(getVisualIntakesOnly(dataRenamed).length).to.equal(84);
        });

        it('short SMI test datafile has 17 visual intakes with unique indices', function() {
          dataVisualIntakes = getVisualIntakesOnly(dataUniqueIndices);
          expect(dataVisualIntakes.length).to.equal(17);
        });
      });
    });

    describe('Process', function() {
      describe('getAoiId()', function() {
        beforeEach(function () {
          resetDatabase();

          aoiName = faker.lorem.words();
          studyId = faker.random.alphaNumeric(17);
          datafileId = faker.random.alphaNumeric(17);

          row = { "aoiName": aoiName };
          aois = [];
          datafile = { "_id": datafileId, "studyId": studyId };
        });

        it('can create a new AOI', function() {
          expect(Aois.find({studyId: studyId}).count()).to.equal(0); //No AOIs exist yet

          aoiId = getAoiId(row, aois, datafile);

          expect(Aois.find({studyId: studyId}).count()).to.equal(1); //Creates a new AOI

          aoi = Aois.findOne({name: aoiName, studyId: datafile.studyId});
          expect(aoi).to.exist;
          expect(aoi._id).to.equal(aoiId);
        });

        it('can find an existing AOI', function() {
          //Create the "existing" AOI
          Aois.insert({
            name: aoiName,
            studyId: studyId,
            datafileIds: [datafileId],
          });

          aois = Aois.find({studyId: studyId}).fetch();
          aoiId = getAoiId(row, aois, datafile);
          aoi = Aois.findOne({name: aoiName, studyId: datafile.studyId});

          expect(Aois.find({studyId: studyId}).count()).to.equal(1); //Doesn't create a new AOI
          expect(aoi).to.exist;
          expect(aoi._id).to.equal(aoiId);
        });

        it('sets AOI properties and adds datafile._id to Aoi.datafileIds', function() {
          aoiId = getAoiId(row, aois, datafile);
          aoi = Aois.findOne({_id: aoiId});
          expect(aoi).to.exist;
          expect(aoi.name).to.equal(aoiName);
          expect(aoi.studyId).to.equal(studyId);
          expect(aoi.datafileIds).to.include(datafile._id);
        });
      });
    });
  });
});