import React from 'react';
import Home from './components/Home';
// import Pres from './components/Pres';
import NewPres from './components/NewPres';
// import UpdatePres from './components/UpdatePres';

import "./App.css"
import { Link, Switch, Route, Redirect } from 'react-router-dom';

function App() {
  return (
    <>
    <header><Link to ="/"><h1>Presentation Timer</h1></Link><div>i</div></header>
    <Switch>
	      <Route exact path="/" component={Home}/>
	      {/* <Route exact path="/pres" component={Pres}/> */}
        <Route exact path="/new" component={NewPres}/>
        {/* <Route exact path="/update" component={UpdatePres}/> */}
       <Redirect to="/"/>
    </Switch>
    </>
  );
}

export default App;
