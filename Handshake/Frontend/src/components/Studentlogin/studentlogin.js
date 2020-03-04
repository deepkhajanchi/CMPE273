import React, {Component} from 'react';
import '../../Styles/studentlogin.css';
import Logo1 from '../../Images/handshake_loginlogo.svg';
import Logo3 from '../../Images/handshake_logindesign1.svg';
import Logo5 from '../../Images/handshake_logindesign.svg';
import {Link} from 'react-router-dom';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

//Define a Login Component
class Loginform extends Component{
  constructor(props){
      super(props);
      this.state={
        emailID: "",
        passWord: "",
        authFlag: false
      }

      this.emailIDChangeHandler= this.emailIDChangeHandler.bind(this);
      this.passWordChangeHandler= this.passWordChangeHandler.bind(this);
      this.submitLogin= this.submitLogin.bind(this);
    }
    componentWillMount(){
      this.setState(
        {
          authFlag:false
        }
      )
    }

      emailIDChangeHandler = (e)=>{
        this.setState({
            emailID: e.target.value
        })
    }

    passWordChangeHandler = (e)=>{
        this.setState({
            passWord: e.target.value
        })
    }

    submitLogin=(e)=>{
      var headers= new Headers();
      //prevent page from refresh
      e.preventDefault();
     // if(this.state.emailID && this.state.passWord){
        const data={
          emailID: this.state.emailID,
          passWord: this.state.passWord
        }
        axios.default.withCredentials=true;
        axios.post('http://localhost:3001/API/Student/student_login',data)
        .then(response=>{
          console.log("status code:",response.status);
          if(response.status === 200){
        //     console.log("response data:",response.data)
        //   if(response.data === 'no info'){
        //    this.setState({
        //        message: " No account found!"
        //     })
            this.setState({
              authFlag: true
            })
            }else{
              this.setState({
                authFlag:false
              })
            }
        /*    
            if(response.data === 'mysql error'){
              this.setState({
                message: "Database error!"
              })
            }
            if(response.data.id){
              let data=JSON.stringify(response.data);
              sessionStorage.setItem('user',data);
              this.setState({
                emailID:"",
                passWord:"",
                message:'success!'
              })
            }
            */
        });
      //}
    /*  else{
        this.setState({
          message:"Fill out all the fields"
        })
      }
      */
    }
  
    render(){
      let redirectVar=null;
      if(cookie.load('cookie')|| sessionStorage.getItem('user')){
        redirectVar=<Redirect to="/landingpage" />
      }
    return(
      <div className="login-v2-container">
        {redirectVar}
        <div className="main">
          <div className="centered-container">
          
          <div className="col-md-12 margin-bottom">
                <label>Email Address</label>
                   <div className="form-group string required user_email">
                       <div className="col-md-12">
                           Please use your school email
                           <input onChange={this.emailIDChangeHandler} className="form-control tt-hint" type="email" placeholder="Email" required />
                        </div>
                    </div>
          </div>
          <br></br>
          <div className="col-md-12 margin-bottom">
                <label>Password</label>
                      <div className="form-group string required user_email">
                        <div className="col-md-12">
                           <input onChange={this.passWordChangeHandler} className="form-control tt-hint" type="password" placeholder="Password" required />
                        </div>
                      </div>
          </div>
          <br>
          </br>
          <div className="sso-button">
                <button onClick={this.submitLogin} className="btn btn btn-success"> Sign In</button>
          </div>
          <div><h4>{this.state.message}</h4></div>
          </div>

          <div className="absolute no-account">
              No account? 
              <b><Link to='/studentregister'> Sign Up here.</Link></b>
          </div>
         </div>

        <div className="sidebar">
          <a className="logo" href="https://www.joinhandshake.com">
            <img alt='Handshake logo' height='42' src={Logo1}/>
          </a>

          <div className='content'>
            <h1 className='marketing-title'>
            Get the job done .
              &nbsp;
            </h1>
            <div className='marketing-content'>
              <h3>Students</h3>
                <p>Launch the next step in your career.</p>
              <h3>Employers</h3>
                <p>Hire the next generation of talent.</p>
              <h3>Career Centers</h3>
                <p>Bring the best jobs to your students.</p>
            </div>
            <div className='marketing-learn-more'>
              <a data-track-click="login-v2-clicked-learn-more" href="https://www.joinhandshake.com">Learn More</a>
            </div>

            <img className='absolute middle-stroke-web' alt='handshake_logindesign' role='presentation' src={Logo5} />

            <img className='absolute bottom-stroke-web' alt='handshake_logindesign3' role='presentation' src={Logo3} />

        </div>
        </div>
        </div>
     
    );
    }
  }
//export Loginform Component
export default Loginform;
