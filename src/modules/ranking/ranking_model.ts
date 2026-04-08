import { ObjectId } from 'mongodb';

export interface UserRanking {
    userId: ObjectId;
    name: string;
    totalAuraPoints: number;
    actionCount: number; // Cuántas acciones ha hecho en total
}