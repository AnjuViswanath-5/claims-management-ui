import React from 'react';
import { Navbar } from 'react-bootstrap';
import {Nav} from 'react-bootstrap';
import { Router, Route, Link, browserHistory, IndexRoute, Redirect  } from 'react-router';
import axios from 'axios';
import { Logger } from 'react-logger-lib';

class LoginComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fields: {},
            errors: {},
            userList:{username:'',password:''},
            validUser:false,
            username:''    
          }
    
          this.handleChange = this.handleChange.bind(this);
          this.submitLoginForm = this.submitLoginForm.bind(this);
    
        }
        
        handleChange(e) {
            let fields = this.state.fields;
            fields[e.target.name] = e.target.value;
            this.setState({
              fields
            });
      
          }

          submitLoginForm(e) {
            e.preventDefault();
            if (this.validateForm()) {
            
                let fields = {};
                fields["username"] = "";
                fields["password"] = "";
                this.setState({fields:fields});
                localStorage.setItem('loggedinUser', this.state.fields["username"]);
              
               // browserHistory.push('viewclaimsummary')
               browserHistory.push({
                pathname: '/home',
                state:this.state.fields["username"]
              });
            }
      
          }

          componentDidMount() {
            axios.get(`http://localhost:7001/users`)
              .then(res => {
                const userList = res.data;
                this.setState({ userList });
               })
               Logger.of('App.LoginComponent.componentDidMount').warn('state=', this.state);
          }

          validateUser()
          {
             let fields = this.state.fields;
             this.state.userList.map((user) => {
                  if (user.username === fields["username"]  && user.password ===fields["password"])  {
                     this.state.validUser=true;
                    //  const username=fields["username"];
                    //  this.setState({username});
                     console.log(this.state.username);
                    return this.state.validUser;
                   }});
                     return this.state.validUser;


          }
     
          validateForm() {

            let fields = this.state.fields;
            let errors = {};
            let formIsValid = true;
            let validUser=false;
      
            if (!fields["username"]) {
              formIsValid = false;
              errors["username"] = "*Please enter your username.";
               Logger.of('App.LoginComponent.componentDidMount').warn('state=', this.state);
            } 
                
            if (!fields["password"]) {
              formIsValid = false;
              errors["password"] = "*Please enter your password.";
            }
            
            validUser=this.validateUser();
              if (formIsValid == true && validUser == false)
              {
                  formIsValid = false;
                  errors["invaliduser"] = "Invalid Credentials";
                  console.log('Is invalid user' + validUser);
              }
              
              console.log('Is valid user' + validUser);
              Logger.of('Login.componentDidMount').warn('Invalid userSS');
            
            
            this.setState({
              errors: errors
            });
            return formIsValid;
       
          }
      
   render() {   
    let h2Style = {
        color: 'White',
  }   	 
      return ( 
          <div>          
        <Navbar bg="dark" variant="dark" fixed="top" >
        <h6 style={h2Style}>Claim Management System</h6>
        </Navbar>
        <div className="login-form">
            <form method="post" onSubmit= {this.submitLoginForm}>   
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Username" id="username" name="username" value={this.state.fields.username}   onChange={this.handleChange}  />
                    <div className="errorMsg">{this.state.errors.username}</div>
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Password" id="password" name="password" value={this.state.fields.password} onChange={this.handleChange} />
                    <div className="errorMsg">{this.state.errors.password}</div>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block"  onClick={this.handleLogin} id="submit">Submit</button>
                    <div className="errorMsg">{this.state.errors.invaliduser}</div>
                </div>       
            </form>
        </div>
        <div className="fixed-footer">
            <div className="container_hf">Copyright &copy; 2020</div>        
        </div>
</div>
 
      );
   }
}

export default LoginComponent;   
