import { Affirmation } from "@/models/affirmation";
import { PartnerConnection } from "@/models/partner-connection";
import { User } from "@/models/user";
import { Timestamp } from "firebase/firestore";

export const _currentUser: User = {
  id: "1",
  uid: "1111",
  name: "Andrew Gerber",
  first: "Andrew",
  last: "Gerber",
  email: "test@test.com",
};

export const users: User[] = [
  {
    id: "1",
    uid: "1111",
    name: "Andrew Gerber",
    first: "Andrew",
    last: "Gerber",
    email: "ag@test.com",
  },
  {
    id: "2",
    uid: "2222",
    name: "Cheyenne Hoffman",
    first: "Cheyenne",
    last: "Hoffman",
    email: "ch@test.com",
  },
  {
    id: "1",
    uid: "1111",
    name: "Test User",
    first: "Test",
    last: "User",
    email: "test@test.com",
  },
];

export const partnerConnections: PartnerConnection[] = [
  {
    id: "1",
    partnerIds: ["1", "2"],
    createdById: "1",
    partnerDetails: [
      {
        userId: "1",
        displayName: "Andrew",
      },
      {
        userId: '2',
        displayName: 'Cheyenne'
      },
    ],
    createdAt: new Timestamp(0, 0),
  },
];

export const affirmations: Affirmation[] = [
  {
    id: "1",
    message: "You are good enough!",
    displayDate: undefined,
    recipientId: _currentUser.id!,
    creatorId: _currentUser.id!,
    createdAt: new Timestamp(0, 0),
  },
  {
    id: "2",
    message: "You are strong enough!",
    displayDate: undefined,
    recipientId: _currentUser.id!,
    creatorId: _currentUser.id!,
    createdAt: new Timestamp(0, 0),
  },
  {
    id: "3",
    message: "You are capable!",
    displayDate: undefined,
    recipientId: _currentUser.id!,
    creatorId: users[1].id!,
    createdAt: new Timestamp(0, 0),
  },
  {
    id: "4",
    message: "You are the designer of your best life!",
    displayDate: undefined,
    recipientId: _currentUser.id!,
    creatorId: _currentUser.id!,
    createdAt: new Timestamp(0, 0),
  },
  {
    id: "3",
    message: "You are capable!",
    displayDate: undefined,
    recipientId: _currentUser.id!,
    creatorId: users[1].id!,
    createdAt: new Timestamp(0, 0),
  },
  {
    id: "4",
    message: "You are the designer of your best life!",
    displayDate: undefined,
    recipientId: _currentUser.id!,
    creatorId: _currentUser.id!,
    createdAt: new Timestamp(0, 0),
  },
];
