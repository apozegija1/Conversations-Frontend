import {IUserCommunication} from '../models/iuser-communication.interface';

export const communications: IUserCommunication[] = [{
  user: {
    id: 2,
    username: 'SuperDzej',
    email: 'dmu@gmail.com',
    firstname: 'Dzej',
    lastname: 'Muha',
    roles: []
  },
  communications: [{
    type: 'sms',
    agentId: 2,
    customerId: 1,
    text: 'Test',
    id: 1,
  },
    {
      type: 'sms',
      id: 1,
      agentId: 2,
      customerId: 1,
      text: 'Replay'
    },
    {
      type: 'sms',
      id: 1,
      agentId: 2,
      customerId: 1,
      text: 'This is longer replay'
    },
    {
      type: 'sms',
      id: 1,
      agentId: 2,
      customerId: 1,
      text: 'This is very long replay, with lot of text and different data, so user can check how it will look like in UI '
    },
    {
      type: 'sms',
      id: 1,
      agentId: 2,
      customerId: 1,
      text: 'This is a new text to same replay'
    },
    {
      type: 'sms',
      id: 1,
      agentId: 2,
      customerId: 1,
      text: 'Very basic replay'
    },
    {
      type: 'sms',
      id: 2,
      agentId: 2,
      customerId: 1,
      text: 'Test replay from customer'
    },
    {
      type: 'sms',
      id: 1,
      agentId: 2,
      customerId: 1,
      text: 'Very basic user replay'
    },
    {
      type: 'sms',
      id: 2,
      agentId: 2,
      customerId: 1,
      text: 'Very basic no replay'
    }]
},
{
  user: {
    id: 3,
    username: 'Test Dzej',
    email: 'dmu@gmail.com',
    firstname: 'Dzej',
    lastname: 'Muha',
    roles: []
  },
  communications: []
}];
