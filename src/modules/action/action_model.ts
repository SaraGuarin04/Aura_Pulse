import { ObjectId } from "mongodb";

export interface Actiondocument{
    _id? : ObjectId,
    userId : ObjectId,
    title: string;
    category: 'Reciclaje' | 'Transporte' | 'Energia' | 'Agua' | 'Otro';
    value : number;
    auraPoints : number;
    createdAT : Date;
}