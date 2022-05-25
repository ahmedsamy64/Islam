import './App.css';
import Home from './components/home';
import Childs from './components/homePages/childs';
import ChildsTournments from './components/homePages/childs/tournments';
import ChildsPics from './components/homePages/childs/childsPics';
import ChildsApp from './components/homePages/childs/childsApp';
import Videos from './components/homePages/videos';
import Pics from './components/homePages/pics';
import WhatTheyDo from './components/homePages/pics/whatTheyDo';
import Landing from './components/landing';
import PageBorders from './components/pageBorders';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom'
import { useLocation, useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';


function App() {
  let location = useLocation();
  let history = useHistory();

  useEffect(() => {
    !(sessionStorage.getItem('language')?.length) && history.replace("/")
  }, [])

  return (
    <div className="App">
      <Switch>
        <Route key="home" path='/home' exact component={Home} />
        <Route key="landing" path='/' exact component={Landing} />
        <Route key="childs" path='/childs' exact component={Childs} />
        <Route key="childsTournments" path='/childs/tournment' exact component={ChildsTournments} />
        <Route key="childsPics" path='/childs/childPics' exact component={ChildsPics} />
        <Route key="app" path='/childs/app' exact component={ChildsApp} />
        <Route key="videos" path='/videos' exact component={Videos} />
        <Route key="pics" path='/pics' exact component={Pics} />
        <Route key="whatTheyDo" path="/pics/what_They_Do" exact component={WhatTheyDo} />
      </Switch>
      {sessionStorage.getItem('language')?.length > 1 ?
        location.pathname === '/' ? null : <PageBorders /> : null}
    </div>
  );
}

export default App;
