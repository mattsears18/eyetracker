import Gazepoints from '../Gazepoints';
import Tabular from 'meteor/aldeed:tabular';
import Studies from '../../Studies/Studies';

new Tabular.Table({
  name: 'GazepointsByViewing',
  collection: Gazepoints,
  extraFields: [
    '_id',
  ],
  columns: [
    {data: 'index', title: 'Index'},
    {data: 'timestamp', title: 'Timestamp'},
    {data: 'timeOfDay', title: 'Time of Day'},
    {data: 'category', title: 'Category'},
    {data: 'x', title: 'X'},
    {data: 'y', title: 'Y'},
  ],
});