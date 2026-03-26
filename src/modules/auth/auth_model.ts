import { ObjectId } from "mongodb";

export interface AuthUser {
  _id?: ObjectId;      
  email: string;       
  password: string;    
  name : string;        
  //role: string;       
  lastLogin?: Date;    
}