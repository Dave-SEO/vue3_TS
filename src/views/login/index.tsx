import {Component, Vue} from 'vue-property-decorator' // 使用装饰器来简化书写
@Component
export default class LoginPage extends Vue{
    protected render(){
        return (
            <div>登录</div>
        )
    }
}