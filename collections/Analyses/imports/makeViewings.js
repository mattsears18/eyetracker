export default async function makeViewings({
  participantId,
  stimulusId,
}) {
  if(!participantId) { throw new Error('noParticipantId'); }
  let participant = Participants.findOne({ _id: participantId });
  if(!participant) {
    throw new Error('Participant not found. participantId: ' + participantId);
  }

  if(!stimulusId) { throw new Error('noStimulusId'); }
  let stimulus = Stimuli.findOne({ _id: stimulusId });
  if(!stimulus) {
    throw new Error('Stimulus not found. stimulusId: ' + stimulusId);
  }

  let search = { participantId: participantId, stimulusId: stimulusId };

  if(this.ignoreOutsideImage) {
    if(stimulus.width) {
      search.x = { $gte: 0, $lte: stimulus.width };
    } else {
      search.x = { $gte: 0 };
    }

    if(stimulus.height) {
      search.y = { $gte: 0, $lte: stimulus.height };
    } else {
      search.y = { $gte: 0 };
    }
  }

  let gazepoints = Gazepoints.find(search, { sort: { timestamp: 1 }});
  let gazepointsArr = gazepoints.fetch();
  let viewings = [];

  if(gazepointsArr.length) {
    let startIndex = 0;
    let number = 1;

    do {
      let endIndex;
      try {
        endIndex = this.getViewingEndIndex({
          gazepoints: gazepointsArr,
          startIndex: startIndex,
        });
      } catch(err) {
        if(err.error == 'minViewingTimeNotMet') {
          startIndex = err.details.nextIndex;
        } else {
          console.log(err);

        }
      }

      if(!endIndex) { continue; }

      try {
        let viewing = await this.makeViewingFromGazepoints({
          gazepoints: gazepointsArr,
          startIndex: startIndex,
          endIndex: endIndex,
          number: number++,
          participantId: participantId,
          stimulusId: stimulusId,
        });
        viewings.push(viewing);
      }
      catch(err) {
        console.log(err);
      }

      startIndex = endIndex + 1;
    } while(startIndex < gazepointsArr.length - 1);
  }

  return viewings;
}