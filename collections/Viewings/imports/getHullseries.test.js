import '../../factories.test';

import { Factory } from 'meteor/dburles:factory';
import { expect } from 'chai';

describe('Viewings.getHullseries()', () => {
  it('gets a hullseries', () => {
    const viewing = Factory.create('viewingWithGazepoints');
    const hullseries = viewing.getHullseries({
      period: 5000,
      timestep: 0,
      includeIncomplete: false,
      pointTrailLength: 10,
    });

    expect(hullseries.getHulls()).is.an('array');
  });
});
