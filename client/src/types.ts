export interface IColor extends Document {
    _id?: string,
    colorCode:string,
    colorName:string,
    votes:number
}

// type ColorProps = {
//     Color: IColor
// }

export type ApiDataType = {
    message: string
    status: string
    colors: IColor[]
    color?: IColor
  }