import { ObjectId } from "mongodb";

export interface Actiondocument{
    _id? : ObjectId,
    userId : ObjectId,
    auraPoints : number;
    createdAT : Date;
}
