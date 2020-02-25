import React, {Component} from 'react';
import '../../Styles/studentregister.css';
import Logo from '../../Images/handshake_fulllogo.svg';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Registerform extends Component {
    render(){
    return(
        <div className="reg_body">
             <div className="navbar global-header navbar-fixed-top sidebar-expanded">
                <div className="global-header-container">
                     <a className="navbar-brand" href="https://www.joinhandshake.com">
                        <img className="navbar-brand__logo-full" alt="Handshake logo" src={Logo} />
                    </a>
                </div>
           
            </div>
            <div id="main">
                <div className="row">
                  
                    <div data-bind="visible: true" data-knockout-class= "RegisterNewUserView" className="new-register-form col-md-12">
                    <div className="margin-top">
                        <form className="simple_form simple-form form-horizontal new_user" id="new_user" noValidate="novalidate">
                            <div class='col-md-4 col-md-offset-1 content' data-bind='invisible: prompt_for_linked_account_password'>
                                <h1 className="heading margin-top">
                                    <b>
                                        Join the Handshake community
                                    </b>
                                </h1>
                                <div data-bind="visible:">
                                    <p className= "subtitle">
                                        Discover jobs and interships based on your interest.
                                    </p>
                                </div>
                                <div className="form-group user_user_type">
                                <div class="col-md-12">
                                    <a href="">Are you an employer? Create an account here.</a> 
                                </div>
                                </div>
                            </div>

                            <div className="col-md-6 content margin-top">
                                <div className="row">
                                    <div className="col-md-12 margin-bottom">
                                        <label>School</label>
                                        <div className="form-group string required school">
                                            <div className="col-md-12">
                                                <input class="form-control tt-hint" name="reg_school" type="text" placeholder="School" required/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12 margin-bottom">
                                         <div className="form-group string required school">
                                            <div className="col-md-12">
                                                <div className="content">
                                                    <div className="instruction">
                                            Your school may have already created an account for you, which is pre fileld and ready to go. This account will be registered under your school email address (your .edu email address). Please try <a rel="nofollow" href="localhost:3000/studentlogin">logging in using your school email first.</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    

                                    <div className="col-md-12 margin-bottom">
                                        <label>First Name</label>
                                        <div className="form-group string required user_first_name">
                                            <div className="col-md-12">
                                                <input class="form-control tt-hint" name="reg_firstname" type="text" placeholder="First Name" required />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12 margin-bottom">
                                        <label>Last Name</label>
                                        <div className="form-group string required user_last_name">
                                            <div className="col-md-12">
                                                <input class="form-control tt-hint" name="reg_lastname" type="text" placeholder="Last Name" required />
                                            </div>
                                        </div>
                                    </div>
                               
                                    <div className="col-md-12 margin-bottom">
                                        <label>Email Address</label>
                                        <div className="form-group string required user_email">
                                            <div className="col-md-12">
                                                Please use your school email
                                            <input class="form-control tt-hint" type="email" placeholder="Email" required />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12 margin-bottom">
                                        <label>Password</label>
                                        <div className="form-group string required user_password">
                                            <div className="col-md-12">
                                            <input class="form-control tt-hint" type="password" placeholder="Password" required />
                                                <p className="password_hint">
                                                    At least 8 characters
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12 margin-bottom">
                                        <label>Confirm Password</label>
                                        <div className="form-group string required user_password">
                                            <div className="col-md-12">
                                                <input class="form-control tt-hint" type="password" placeholder="Confirm Password" required />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12 margin-bottom">
                                        <input type="submit" name="commit" value="Create Account" class="btn btn btn-success"/>
                                    </div>

                                </div>
                            </div>
                        </form>
                        </div>
                    </div>
                </div> 
            </div>       
         </div>
    );
    }
}

//export Registerform Component
export default Registerform;
