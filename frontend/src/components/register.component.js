import React,{Component} from 'react'
import {Button, Input, Label} from 'semantic-ui-react'
import Axios from 'axios'
export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state={
            email:'',
            password:'',
            name:'',
            errmsg:''
        }
        this.onChange=this.onChange.bind(this)
        this.onSubmit=this.onSubmit.bind(this)
    }
    onSubmit=(e)=>{
        e.preventDefault()
        // console.log(this.state)
        Axios.post('https://userloginsysshree.herokuapp.com/User/Register',{
            email:this.state.email,
            password:this.state.password,
            name:this.state.name
        }).then(res=>{
            console.log(res)
            if(res.data.User){
                console.log(res)
                localStorage.setItem('user',res.data.User.name)
                localStorage.setItem('email',res.data.User.email)
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
                        <Label content='Full Name' className='m-2 p-3' color='blue'></Label>
                        <Input type='text' name='name' icon='address card' onChange={this.onChange} ></Input>
                    </div>
                    <div className='mt-3'>
                        <Label content='Username' className='m-2 p-3' color='blue'></Label>
                        <Input type='email' name='email' icon='user circle' onChange={this.onChange} ></Input>
                    </div>
                    <div className='mt-3'>
                        <Label content='Password' className='m-2 p-3' color='blue'></Label>
                        <Input type='password' name='password' icon='lock' onChange={this.onChange}></Input>
                    </div>
                    <div className='mt-3'>
                        <Button content='Login' type='submit' color='blue'></Button>
                    </div>
                    <div style={{color:"gray"}} className='mt-1'>
                        <span className='ml-3'>Already have account with us?
                            <a href='/Login' className='ml-2'>
                        Login
                        </a>
                        </span>
                    </div>
                </form>
            </div>
        );
    }
}