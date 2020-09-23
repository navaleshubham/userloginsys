import React,{Component} from 'react'
import { Button,Header } from 'semantic-ui-react'

export default class Navbar extends Component {
    render() {
        var name=localStorage.getItem('user')+' (logout)'
        return (

            <div  className='d-flex justify-content-between mt-3 mx-5'>

                <Header content='CRUD Application' color="blue" />
                {/* <div>
                    {localStorage.getItem('user')!==null?
                        <span className='d-flex justify-content-center'>
                            <Button content='Home' primary href='/Home' />
                        </span>:null
                    }
                </div> */}
                <div>
                    {localStorage.getItem('user')===null?
                        <span>
                            <Button content='Login'  color='red' href='/Login' />
                        </span>:
                        <Button content={name}  onClick={()=>{localStorage.clear()}} color='red' href='/' />
                    }
                </div>
            </div>
        )
    }
}