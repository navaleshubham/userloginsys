import React from 'react';
import './App.css';
import Navbar from './components/navbar.component';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Footer from "./components/footer.component";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from './components/Home.component'
function App() {
    return (
        <div className="App">
            <Navbar></Navbar>
            <hr></hr>

            <BrowserRouter>
                <Switch>
                    {localStorage.getItem('user')===null?
                    <Route path='/' exact  component={Login}></Route>:
                    <Route path='/' exact  component={Home}></Route>
                    }
                    <Route path='/Login' component={Login}></Route>
                    <Route path='/Register' component={Register}></Route>
                    <Route path='/Home' component={Home}></Route>
                </Switch>
            </BrowserRouter>
            <Footer></Footer>
        </div>
    );
}

export default App;
