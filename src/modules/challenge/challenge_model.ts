import { ObjectId } from 'mongodb';

export interface Challenge {
  _id?: ObjectId;
  name: string;
  description: string;
  pointsReward: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  createdAt: Date;
}
