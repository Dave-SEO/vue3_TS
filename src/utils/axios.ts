import config from '@/config/index'
const {api:{devApiBaseUrl,proApiBaseUrl}} = config
const apiBaseUrl = process.env.NODE_ENV === 'production'? proApiBaseUrl : devApiBaseUrl 
// process.env.NODE_ENV是vue服务内置的环境变量，有两个值，当本地开发时是development，当打包时是production

import axios,{AxiosInstance,AxiosRequestConfig,AxiosPromise,AxiosResponse} from 'axios' // 引入axios 和定义在node_modules/axios/index.ts文件里的类型声明
// 定义一个接口请求类，用于创建axios请求实例
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
export interface ResponseData{
    code: number,
    data?:any,
    msg: string
}
class HttpRequest{
    constructor(public baseUrl:string = apiBaseUrl){ // 接收字符串参数，用于接口请求
        this.baseUrl = baseUrl
    }
    public request(options: AxiosRequestConfig): AxiosPromise{ // 实际调用的方法，返回AxiosPromise
        const instance:AxiosInstance = axios.create()   // 使用axios.create方法创建一个axios实例，他是一个函数，同时包含多个属性
        options = this.mergeConfig(options)  // 合并option
        this.interceptors(instance, options.url)  // 调用interceptors方法使拦截器生效
        return instance(options) // 最后返回AxiosPromise
    }
    private interceptors(instance: AxiosInstance, url?:string){ // 定义这个函数用于添加全局请求和响应拦截逻辑
        // 在这里添加请求和响应拦截
        instance.interceptors.request.use((config: AxiosRequestConfig)=>{
            return config
        }, error=>{
            return Promise.reject(error)
        })
        instance.interceptors.response.use((res: AxiosResponse) => {
            const  {data} = res// res的类型是AxiosResponse<any>，包含六个字段，其中data是服务端返回的数据
            const {code, msg} = data // 通常服务端会将响应状态码、提示信息、数据等放到返回的数据中
            if(code !== 0){ // 这里我们在服务端将正确返回的状态码标为0
                console.error(msg) // 如果不是0，则打印错误信息，我们后面讲到UI组件的时候，这里可以使用消息窗提示
            }
            return res
        }, error=> { // 这里是遇到报错的回调
            return Promise.reject(error)
        })
    }
    private  mergeConfig(options:AxiosRequestConfig): AxiosRequestConfig{
        return Object.assign({baseUrl:this.baseUrl}, options)
    }
}
export default HttpRequest
