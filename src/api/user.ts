import axios,{ResponseData}  from './index'
import {AxiosPromise} from 'axios'
// 定义用户名和密码的字段接口类型
interface LoginReqArguInterface{
    user_name:string
    password: number | string
}
export const loginReq =(data:LoginReqArguInterface):AxiosPromise<ResponseData>=>{
    return axios.request({
        url: '/api/user/login',
        data,
        method: 'POST'
    })
}