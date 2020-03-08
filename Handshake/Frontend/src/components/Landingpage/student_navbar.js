import React, {Component} from 'react';
import '../../Styles/student_navbar.css';
import Logo from '../../Images/handshake_loginlogo.svg';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';

class StudentNav extends Component{
    constructor(props){
        super(props);
        this.state={

        }
       // this.handleLogout=this.handleLogout.bind(this);
    }
  render(){
    let redirectVar = null;
  //  if(!cookie.load('cookie')){
    //    redirectVar = <Redirect to= "/"/>
 // }
      return(
          <div>
            {redirectVar}
            <div className="turbolinks-progress-bar  student-nav">
            <div className="layout-wide-dashboard style__student-home___qienE .transition-to-blue">
            <div data-turbolinks-permanent id="permanent-topbar">
            <div data-react-class="StudentTopbarWhiteRoot">
                <div>
                    <div>
                        <div>
                            <nav className="style_topbar-container___2Et0k" data-hook="student-topbar">
                                <div className="style__topbar___lg_T-">
                                    <div className="style__container___15rlp style__large___3HKaH style__fitted___2ndoo" data-hook="container">
                                        <div className="style__content__52wSy">
                                            <div className="style__logo-container___9x_d2">
                                                <a><Link to="/student_navbar">
                                                    <svg xmlns="http://www.w3.org/2000/svg" id="logo-icon" viewBox="0 0 80.1 96.1" className="style__logo-icon___1eROG" width="32" height="32">
                                                        <title>Handshake</title>
                                                        <path className="style__logo-icon-content___1-wtb" d="
                                                            M76.6 42.9c-1.6-.6-9.2-2.4-19
                                                            .1-24.6 6.3-29.1-6.6-39.5-9.6-2.4-.7-12.2-1.5-15.9.4-1.3.7-2.2
                                                            2.3-2.2 3.8 0 6.7-.1 36.8-.1 51 0 4.1 3.3 7.4 7.4
                                                            7.4h15.4c4 0 7.3-3.3 7.4-7.3.1-12.4.3-33.7.3-36.1
                                                            0-.9.5-1.1 1.6-1.4 9.8-2.5 17.4 3 17.6 10.7.2 8.5.4
                                                            18.3.4 26.8 0 4 3.3 7.3 7.3 7.3 4.6 0 10.4.1 15.3.1
                                                            4 0 7.3-3.3 7.3-7.3 0-13.7.1-33.3.1-41.4 0-2.4-1.4-3.7-3.4-4.5zM66.5
                                                            36.8c7.5 0 13.6-6.1 13.6-13.6S74 9.6 66.5 9.6s-13.6 6.1-13.6
                                                            13.6c0 7.6 6.1 13.6 13.6 13.6zM14.3 28.6c7.9 0 14.3-6.4 14.3-14.3S22.2
                                                            0 14.3 0 0 6.4 0 14.3s6.4 14.3 14.3 14.3z">      
                                                            </path>
                                                    </svg>
                                                    </Link>
                                                    </a>
                                            </div>
                                            
                                            <a className="style__nav-link___3OIDg style__nav-link___2tzH7" href="/student_jobs">
                                                <span data-hook="student-topbar-jobs-link">
                                                    <span>
                                                        Jobs
                                                    </span>
                                                </span>
                                            </a>
                                            <a className="style__nav-link___3OIDg style__nav-link___2tzH7" href="/student_events">
                                                <span>
                                                    <span>
                                                        Events
                                                    </span>
                                                </span>
                                            </a>
                                            <div className="dropdown pull-right style__dropdown___2DowA" data-hook="account-dropdown">
                                                <button id="account-dropdown" className="style__dropdown-button___2ZIiL dropdown-toggle" aria-label="navigation modal button" aria-haspopup="true" aria-expanded="false" data-toggle="dropdown" type="button">
                                                   
                                                    <div className="style__avatar___2JuVa style__avatar-color-yellow___1_xAM style__avatar-tiny___3aaPa style__avatar-round___3RzuF">
                                                    <div className="style__avatar-text___pUYyC">

                                                    </div>
                                                    </div>
                                                    
                                                </button>
                                                <ul className="dropdown-menu style__dropdown-menu___1K5xf style__fade___2BobZ" aria-labelledby="account-dropdown" role="menu">
                                                    <li role="menuitem">
                                                        <div className="style__link-container___2N09z">
                                                            <a className="style__nav-link___3OIDg" href="">
                                                                <span>
                                                                    <span>
                                                                    My Profile
                                                                    </span>
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </li>
                                                    <li>
                                                    <div className="style__link-container___2N09z">
                                                            <a className="style__nav-link___3OIDg">
                                                                <span>
                                                                    <span>
                                                                    <Link to="/" onClick={this.handleLogout}>Sign Out</Link>
                                                                    </span>
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            </div>
                                        </div>
                                    </div>

                            </nav>
                        </div>
                    </div>
                </div>
            </div>
                
            </div>
            </div>
          </div>
        </div>
      );
  }
}


export default StudentNav;
