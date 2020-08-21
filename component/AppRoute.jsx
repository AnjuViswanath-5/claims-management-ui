import React from 'react';
import { Router, Route, Link, browserHistory, IndexRoute  } 
from 'react-router';

class AppRouter extends React.Component {
   render() {
      return (
         <div> 
              {this.props.children} 
         </div>
      )
   }
}

export default AppRouter;





