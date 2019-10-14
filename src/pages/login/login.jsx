import React from 'react'
import Logo from './images/logo.png'
import './login.less'
import {Form, Icon, Input, Button} from 'antd';

class Login extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                //console.log('Received values of form: ', values);
                this.props.history.replace('/')
            }
        });
    };
    passwordCalidator = (rule, value, callback)=>{
        console.log("rule"+rule+",value:"+value)
        try {
            if (!value) {
                callback("请输入密码！");
            }else if (value.length < 4) {
                callback("密码必须大于等于四位！");
            }else if (value.length >= 12) {
                callback("密码必须小于等于十二位！");
            }else if (!/^[a-zA-Z0-9_]+/.test(value)) {
                callback("密码由数字、字母和下划线组成!");
            }else {
                callback();
            }
            //throw new Error('Something wrong!');
        } catch (err) {
            callback(err);
        }
    }
    render() {
        const {getFieldDecorator} = this.props.form
        const usernameInit = 'admin'
        return (
            <div className='login'>
                <header className='login-header'>
                    <img src={Logo}/>
                    <h1>React项目: 后台管理系统</h1>
                </header>
                <section className='login-content'>
                    <h2>用户登陆</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {
                                getFieldDecorator("username", {
                                    rules: [
                                        {required: true,whitespace: true, message: '请输入用户名!'},
                                        {min: 4, message: '用户名大于四位!'},
                                        {max: 12, message: '用户名小于十二位!'},
                                        {pattern: /^[a-zA-Z0-9_]+/, message: '用户由数字、字母和下划线组成!'},
                                    ],
                                    initialValue: usernameInit,
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        placeholder="用户名"
                                    />,
                                )}

                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator("password",{
                                    rules:[
                                        {validator:this.passwordCalidator}
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        type="password"
                                        placeholder="密码"
                                    />,
                                )
                            }

                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}

const wrapForm = Form.create()(Login)
export default wrapForm