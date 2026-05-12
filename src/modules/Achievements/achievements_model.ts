import { ObjectId } from 'mongodb';

export interface Achievement {
  _id?: ObjectId;
  name: string;
  description: string;
  icon: string; 
  userId: ObjectId;
  unlockedAt: Date;
}
