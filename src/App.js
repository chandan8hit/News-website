import './App.css';
import React, { useState } from 'react'
import Navbar from './component/Navbar';
import News from './component/News';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = (props) => {
  const pagesize = 25;
  const apikey = process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(0);

  return (
    <div>
      <BrowserRouter>
        <LoadingBar color='#f11946' progress={progress} />
        <Navbar />
        <Switch>
          <Route exact path="/"><News setProgress={setProgress} apikey={apikey} key="general" pageSize={pagesize} country="in" category="general" /></Route>
          <Route exact path="/business"><News setProgress={setProgress} apikey={apikey} key="business" pageSize={pagesize} country="in" category="business" /></Route>
          <Route exact path="/entertainment"><News setProgress={setProgress} apikey={apikey} key="entertainment" pageSize={pagesize} country="in" category="entertainment" /></Route>
          <Route exact path="/general"><News setProgress={setProgress} apikey={apikey} key="general" pageSize={pagesize} country="in" category="general" /></Route>
          <Route exact path="/health"><News setProgress={setProgress} apikey={apikey} key="health" pageSize={pagesize} country="in" category="health" /></Route>
          <Route exact path="/science"><News setProgress={setProgress} apikey={apikey} key="science" pageSize={pagesize} country="in" category="science" /></Route>
          <Route exact path="/sports"><News setProgress={setProgress} apikey={apikey} key="sports" pageSize={pagesize} country="in" category="sports" /></Route>
          <Route exact path="/technology"><News setProgress={setProgress} apikey={apikey} key="technology" pageSize={pagesize} country="in" category="technology" /></Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;