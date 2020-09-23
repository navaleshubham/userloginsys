import React,{Component} from 'react'
export default class Home extends Component {
    render(){
        return(
            <div>
                {localStorage.getItem('user')!==null?
                <span>
                    <ul  className='list-unstyled'>
                        <li className='h3'>User Email:- {localStorage.getItem('email')}</li>
                        <li className='h3'>User Name:- {localStorage.getItem('user')}</li>
                    </ul>
                </span>:
                <h1 className='mx-auto'>Please Login</h1>
                }
            </div>
        )
    }
}