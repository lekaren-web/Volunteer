// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Events, Users } = initSchema(schema);

export {
  Events,
  Users
};