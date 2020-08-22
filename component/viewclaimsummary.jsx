import React from 'react';
import { Navbar } from 'react-bootstrap';
import {Nav} from 'react-bootstrap';
import {Table} from  'react-bootstrap';
import axios from 'axios';
import {  Link, browserHistory  } 
from 'react-router';



class ViewClaimSummary extends React.Component {
  constructor(props){
   
    super(props);
    //this.handleClick = this.handleClick.bind(this);

  var today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  this.state = {
    claimList: [],
    date: date,
    username: localStorage.getItem('loggedinUser'),
};

}


 //Load claim summary data from claims json
     componentDidMount() {
       
        axios.get(`http://localhost:7000/claims/list`)
          .then(res => {
            const claims = res.data;
            const claimList = claims.map(u =>
            
                <tr>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.claimno}</td>
                <td >{u.claimtype}</td>
                <td >{u.claimdesc}</td>
                <td>{u.claimstartdate}</td>
                <td>{u.claimenddate}</td>
               <td><Link to={{
                pathname: 'updateclaim',
                state: [{empid: u.id, empname: u.name ,claimno:u.claimno,claimtype:u.claimtype,
                  claimdesc:u.claimdesc,claimstartdate:u.claimstartdate,claimenddate:u.claimenddate,username:this.state.username}],
                }}> Update </Link></td>
            </tr>
                )
            this.setState({ claimList });
           })
      }
    //   handleClick(id, e){
    //     this.state.selectedId=id;
    // }

   render() {  
    let h2Style = {
      color: 'White',
}
let activeStyle = { color: '#ff3333' };
const { showHideHome, showHideAbout, showHideContact } = this.state;
      return ( 
          <div>
        <Navbar bg="dark" variant="dark"  >
          <h6 style={h2Style}>Claim Management System</h6>
        <Nav className="ml-auto">
      <Nav.Link >Welcome User!! {this.state.username}</Nav.Link>
      <Nav.Link >{this.state.date}</Nav.Link>
      <Nav.Link onClick={() => browserHistory.push('login')}>Log Out</Nav.Link>
        </Nav>
        </Navbar> 
      
      <Navbar bg="dark" variant="dark"  >
        <Nav className="mr-auto">
        <Nav.Link onClick={() => browserHistory.push('home')}>Home</Nav.Link>
      <Nav.Link  style={activeStyle} onClick={() => browserHistory.push('viewclaimsummary')} >Update Claim Summary</Nav.Link>
      <Nav.Link onClick={() => browserHistory.push('about')}>About</Nav.Link>
      <Nav.Link onClick={() => browserHistory.push('contact')}>Contact Us</Nav.Link>
        </Nav>
        </Navbar> 
      
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Employee Name</th>
            <th>Claim Number</th>
            <th>Claim Type</th>
            <th>Claim Programs</th>
            <th>Claim Start Date</th>
            <th>Claim End Date</th>
            <th></th>
          </tr>
        </thead>
  
      <tbody>
       {this.state.claimList}
      </tbody>
  
  </Table>
 
  <div className="fixed-footer">
            <div className="container_hf">Copyright &copy; 2020</div>        
        </div>
 </div>
      );
   }
}

export default ViewClaimSummary;   
