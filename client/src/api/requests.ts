import axios, {AxiosResponse} from 'axios';
import { ApiDataType } from '../types';

const baseUrl:string = 'http://localhost:3001';

export const getColors = async (): Promise<AxiosResponse<ApiDataType>> => {
    try {
      const colors: AxiosResponse<ApiDataType> = await axios.get(
        baseUrl + '/colors'
      )
      return colors
    } catch (error:any) {
      console.log(error)
      throw new Error(error)
    }
  }

  export const getMaxVotesColor = async () : Promise<AxiosResponse<number>>=> {
    try {
      const {data}  = await axios.get(
        baseUrl + '/colors/max'
      )
      return data;
    } catch (error:any) {
      console.log(error)
      throw new Error(error)
    }
  }

  export const updateColors = async (id:string): Promise<AxiosResponse<ApiDataType>> => {
    try {
      const updatedColor: AxiosResponse<ApiDataType> = await axios.put(
        `${baseUrl}/edit-color/${id}`,
      )
      return updatedColor
    } catch (err:any) {
      console.log(err)
      throw new Error(err)
    }
  }
  export const updateColorWithVotes = async (id:string,votes:number): Promise<AxiosResponse<any>> => {
    try {
      console.log(votes)
      const updatedColor: AxiosResponse<ApiDataType> = await axios.put(
        `${baseUrl}/edit-color-vote/${id}`,
        {votes},
      )
      console.log(updatedColor)
      return updatedColor
    } catch (err:any) {
      console.log(err)
      throw new Error(err)
    }
  }
