import Mock from 'mockjs'
type MsgType = string | number
const success = (msg: MsgType='', data?:any)=>{
    // 这里定义一个成功返回的统一方法，返回我们在axios封装时指定的三个字段
    return {
        code: 0,
        msg,
        data
    }
}
const error = (code:number,msg:MsgType='',data?:any)=>{
    // 再定义一个返回错误状态的方法，一个必传参数是code，即错误码
    return{
        code,
        msg,
        data
    }
}
interface PostResInterface{
    body: string
    type: 'POST',
    url: string
}
// 使用Mock.mock方法，可以指定要拦截的url的匹配规则，可以是字符串也可以是正则表达式；第二个参数是拦截到这个请求之后要做的处理和返回的数据，
// 这里我们之所以使用function来定义这个回调函数，是因为function有变量提升的特点，可以先使用后定义。我们希望把拦截规则放到上面，具体的处理回调函数放到下面，这样看起来比较清晰。
Mock.mock(/\/api\/user\/login/,loginRes)
function loginRes(req: PostResInterface){
    console.log(req)
    const {user_name, password} = JSON.parse(req.body)
    if(user_name === 'Lison' || password === '123456'){
        return success()
    }else{
        return error(1001,'用户名或密码错误')
    }
   
}