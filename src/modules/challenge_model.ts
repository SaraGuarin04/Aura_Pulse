import { ObjectId } from 'mongodb';

export interface Challenge {
  _id?: ObjectId;
  title: string;
  description: string;
  pointsReward: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  createdAt: Date;
}