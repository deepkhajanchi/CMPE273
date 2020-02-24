import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Loginform from './Studentlogin/studentlogin';
import Registerform from './Studentregister/studentregister';

//Create a Main Component
class Main extends Component {

    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={Registerform}/>
                <Route path="/studentlogin" component={Loginform}/>
            </div>
        );
    }
}

//Export The Main Component
export default Main;
