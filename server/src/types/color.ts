import {Document} from 'mongoose';

export interface IColor extends Document {
    colorCode:string,
    colorName:string,
    votes:number
}