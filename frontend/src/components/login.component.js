import React,{Component} from 'react'
import {Button, Input, Label} from 'semantic-ui-react'
import Axios from "axios";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state={
            email:'',
            password:'',
            errmsg:''
        }
        this.onChange=this.onChange.bind(this)
        this.onSubmit=this.onSubmit.bind(this)
    }
    onSubmit=(e)=>{
        e.preventDefault()
        console.log(this.state.email.search('.'))
        if(this.state.email.search('@')===-1){
            return this.setState({
                errmsg:'Please Enter proper Email adress'
            })
        }
        console.log(this.state)
         Axios.post('https://userloginsysshree.herokuapp.com/User/Login',{
            email:this.state.email,
            password:this.state.password
        }).then(res=>{
            console.log(res)
            if(res.data.data){
                console.log(res.data.data)
                localStorage.setItem('user',res.data.data.name)
                localStorage.setItem('email',res.data.data.email)
                this.props.history.push('/Home')
                window.history.go(0)
            }
            else{
                this.setState({
                    errmsg:res.data
                })
            }
        })
    }
    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    render() {
        return (
            <div className='container jumbotron mt-5'>
                {this.state.errmsg !==''?
                    <Label content={this.state.errmsg} style={{width:'300px',fontsize:'20px'}} color='red'></Label> :null
                }
                <form  onSubmit={this.onSubmit}>
                    <div className='mt-3'>
                        <Label content='Username' className='m-2 p-3' color='blue'></Label>
                        <Input type='email' name='email' icon='user' onChange={this.onChange} ></Input>
                    </div>
                    <div className='mt-3'>
                        <Label content='Password' className='m-2 p-3' color='blue'></Label>
                        <Input type='password' name='password' icon='lock' onChange={this.onChange}></Input>
                    </div>
                    <div className='mt-3'>
                        <Button content='Login' type='submit' color='blue'></Button>
                    </div>
                    <div style={{color:"gray"}} className='mt-1'>
                        <span className='ml-3'>Not have account with us?
                            <a href='/Register' className='ml-2'>
                        Sign Up
                        </a>
                        </span>
                    </div>
                </form>
            </div>
        );
    }
}