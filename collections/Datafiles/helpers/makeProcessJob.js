import Jobs from '../../Jobs/Jobs';

export default function makeProcessJob() {
  let job = new Job(Jobs, 'datafiles.process',
    { datafileId: this._id }
  );

  job.priority('normal')
    .retry({
      retries: Jobs.forever,
      wait: 1000,
      backoff: 'constant',  // wait constant amount of time between each retry
    })
    .save();
}