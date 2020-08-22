import React from 'react';
import { Navbar } from 'react-bootstrap';
import {Nav} from 'react-bootstrap';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import axios from 'axios';


class UpdateClaim extends React.Component {
  constructor(props){
   
    super(props);
 
  

  var today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  this.state = {
    value:'',
    date: date,
     id:'',
      name:'',
      claimno:'',
      claimtype:'',
      claimdesc:'',
      claimstartdate:'',
      claimenddate:'',
      errors: {},
      username: localStorage.getItem('loggedinUser')
     
};

this.handleChange = this.handleChange.bind(this);
this.handleSubmit = this.handleSubmit.bind(this);
};


componentDidMount() {
  console.log(this.state.username);
  
    const id=this.props.location.state[0].empid;
    this.setState({id});
    const name=this.props.location.state[0].empname;
    this.setState({name});
    const claimno=this.props.location.state[0].claimno;
    this.setState({claimno});
    const claimtype=this.props.location.state[0].claimtype;
    this.setState({claimtype});
    const claimdesc=this.props.location.state[0].claimdesc;
    this.setState({claimdesc});
    const claimstartdate=this.props.location.state[0].claimstartdate;
    this.setState({claimstartdate});
    const claimenddate=this.props.location.state[0].claimenddate;
    this.setState({claimenddate});
    const username=this.props.location.state[0].username;
    this.setState({username});
   
     
}

handleChange(e) 
{ 
  
  if (e.target.name === 'claimno') {
        this.setState({ claimno : e.target.value });}
  if (e.target.name === 'claimpgm') {
         this.setState({ claimdesc: e.target.value });}
  if (e.target.name === 'claimtype') {
      this.setState({ claimtype: e.target.value });}
  if (e.target.name === 'claimstartdate') {
      this.setState({ claimstartdate: e.target.value});}
  if (e.target.name === 'claimenddate') {
      this.setState({ claimenddate: e.target.value});}
      console.log(e.target.value);
  }


handleSubmit(e){
  e.preventDefault();
  // get our form data out of state
  const data=
  { id:this.state.id, 
    name:this.state.name,
    claimno:this.state.claimno, 
    claimtype:this.state.claimtype,
    claimdesc:this.state.claimdesc,
    claimstartdate:this.state.claimstartdate,
    claimenddate:this.state.claimenddate} ;

  console.log(data);
  if (this.validateForm()) {
     
  const claims=JSON.stringify(data);
  console.log(claims);
  axios.put(`http://localhost:7000/claims/update/${this.state.id}`,
   { "id":this.state.id,"name":this.state.name,"claimno":this.state.claimno, 
   "claimtype":this.state.claimtype,"claimdesc":this.state.claimdesc,
   "claimstartdate":this.state.claimstartdate,"claimenddate":this.state.claimenddate})
      .then(res => {
        console.log(res);
        browserHistory.push('viewclaimsummary');
      })
    }
}

validateForm() {

  let errors = {};
  let formIsValid = true;
  let validUser=false;

   if (this.state.claimno === "") {
     formIsValid = false;
    errors["claimno"] = "*Please enter Claim Number.";
  } 
      
    if (this.state.claimtype ===  "") {
     formIsValid = false;
      errors["claimtype"] = "*Please select a Claim Type.";
    }

    if (this.state.claimdesc ===  "") {
    formIsValid = false;
    errors["claimpgm"] = "*Please enter Claim Program.";
  }

   if (this.state.claimstartdate ===  "") {
     formIsValid = false;
    errors["claimstartdate"] = "*Please select a Claim Start Date.";
   }

   if (this.state.claimenddate ===  "") {
     formIsValid = false;
     errors["claimenddate"] = "*Please select a Claim End Date.";
   }
  
   const letters = /^[0-9a-zA-Z]+$/;
      if(this.state.claimno != "" && !this.state.claimno.match(letters))
      {
        formIsValid = false;
        errors["claiminvalid"] = "*Please select a valid Claim Number.";
      }
  
  
  this.setState({
    errors: errors
   });
  return formIsValid;

}

  render() {     
    console.log(this.state.data);
    let h2Style = {
      color: 'White',
              }
              let activeStyle = { color: '#ff3333' };
              
       return ( 
         <div>
        <Navbar bg="dark" variant="dark"  >
          <h6 style={h2Style}>Claim Management System</h6>
        <Nav className="ml-auto">
       <Nav.Link >Welcome User!!{this.state.username}</Nav.Link>
      <Nav.Link >{this.state.date}</Nav.Link>
      <Nav.Link onClick={() => browserHistory.push('login')}>Log Out</Nav.Link>
        </Nav>
        </Navbar> 
      
      <Navbar bg="dark" variant="dark"  >
      <Nav className="mr-auto">
      <Nav.Link onClick={() => browserHistory.push('home')}>Home</Nav.Link>
      <Nav.Link  style={activeStyle} onClick={() => browserHistory.push('viewclaimsummary')} >Update Claim Summary</Nav.Link>
      <Nav.Link href="#about">About</Nav.Link>
      <Nav.Link href="#contactus">Contact Us</Nav.Link>
        </Nav>
        </Navbar> 
      
       <div className="container contact">               
        <div className="col-md-9">
      <div className="contact-form">
      <form method="post" onSubmit= {this.submitLoginForm}> 
        {/* <div className="form-group">
          <label className="control-label col-sm-4"  htmlFor="empid">Employee ID:</label>
          <div className="col-sm-10">          
            <input type="text" defaultValue={this.state.data.id} className="form-control" id="empid"  name="empid" disabled={true} />
          </div>
        </div> */}
        <div className="form-group">
          <label className="control-label col-sm-4" htmlFor="empname">Employee Name:</label>
          <div className="col-sm-10">          
            <input type="text" ref defaultValue={this.state.name} className="form-control" id="empname"   name="empname" disabled={true} />
          </div>
         
        </div>
        <div className="form-group">
          <label className="control-label col-sm-4" htmlFor="claimno">Claim Number:</label>
          <div className="col-sm-10">
            <input type="text" maxLength="9" defaultValue={this.state.claimno}  className="form-control" id="claimno" name="claimno"  onChange={this.handleChange}/>
          </div>
          <div className="errorMsg">{this.state.errors.claimno}</div>
          <div className="errorMsg">{this.state.errors.claiminvalid}</div>
        </div>
         <div className="form-group">
            <label className="control-label col-sm-4" htmlFor="claimtype">Claim Type:</label>
            <div className="col-sm-10">
             {/* <Select   value={selectedOption} id="claimtype"  name="claimtype" options={ClaimStatus} onChange={this.handleChange}/>   */}
             <select value={this.state.claimtype} className="form-control" id="claimtype"  name="claimtype" onChange={this.handleChange}>
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Submitted">Submitted</option>
                <option value="Recieved">Received</option>
                <option value="Denied">Denied</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div className="errorMsg">{this.state.errors.claimtype}</div>
          </div> 
          <div className="form-group">
            <label className="control-label col-sm-4" htmlFor="claimpgm">Claim Program:</label>
            <div className="col-sm-10">
              <input type="text"  maxLength="20" defaultValue={this.state.claimdesc} className="form-control" id="claimpgm" name="claimpgm"  onChange={this.handleChange}/>
            </div>
            <div className="errorMsg">{this.state.errors.claimpgm}</div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-4" htmlFor="claimstartdate">Claim Start Date:</label>
            <div className="col-sm-10">
              <input type="date" defaultValue={this.state.claimstartdate} className="form-control" id="claimstartdate" name="claimstartdate"  onChange={this.handleChange}/>
            </div>
            <div className="errorMsg">{this.state.errors.claimstartdate}</div>
           </div>
          <div className="form-group">
            <label className="control-label col-sm-4" htmlFor="claimenddate">Claim End Date:</label>
            <div className="col-sm-10">
              <input type="date" defaultValue={this.state.claimenddate} className="form-control" id="claimenddate" name="claimenddate" onChange={this.handleChange}/>
            </div>
            <div className="errorMsg">{this.state.errors.claimenddate}</div>
          </div>       
        <div className="form-group">        
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-default" onClick={this.handleSubmit} >Submit</button>
            <button type="submit" className="btn btn-default" onClick={() => browserHistory.push('viewclaimsummary')}>Cancel</button>
          </div>
    </div>
    <div className="form-group" hidden={true}>
        <label  className="success_label" htmlFor="successmsg" id="successmsg">Claim Details updated successfully</label>
      </div>
</form>
</div>
</div>
</div>
</div>
);
   }
}

export default UpdateClaim; 
    