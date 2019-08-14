import {Component, Vue} from 'vue-property-decorator' // 使用装饰器来简化书写
import {loginReq} from '@/api/user'
import Cookies from 'js-cookie'
@Component
export default class LoginPage extends Vue{
    public user_name:string = ''
    public password:string | number = ''
    public login(){
        loginReq({user_name:this.user_name,password:this.password})
        .then(res=>{
            console.log(res)
           const {data:{code,msg}} = res
           if(code === 0){
            Cookies.set('token', 'value')
            this.$router.push('/home')
           }else{
               console.log(msg)
           }
        })
    }
    protected render(){
        return (
            <div class="login">
                <input type="text" v-model={this.user_name}/> <br/>
                <input type="password" v-model={this.password}/> <br/>
                <button on-click={this.login}>登录</button>
            </div>
        )
    }
}