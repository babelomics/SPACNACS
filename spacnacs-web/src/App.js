import './App.css';
import React from 'react';

import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter as Router, Route,  Switch, useHistory, useLocation } from 'react-router-dom';

import MenuBar from './jmurillo/tools/menu-bar/ConnMenuBar';
import HomePage from './HomePageCnv.js';
import InteractiveInterpretator from './jmurillo/tools/interactive-interpretator/ActualInteractiveInterpretator';

import NotFoundScreen from './NotFoundScreen';

import Client from './jmurillo/client-interfaces/Client';
import CNVsClient from './jmurillo/client-interfaces/cnvs/CNVsClient';

import createStore from './createStore';

import config from './config';
Client.instance = new CNVsClient(config.opencga);



const store = createStore();



function InnerApp() {
    const location = useLocation();
    console.log(location);

    return (
        <React.Fragment>
            <MenuBar style={{ zIndex: 100 }}/>
            <Switch>
                <Route exact path="/spacnacs/" component={HomePage} />
                <Route path="/spacnacs/igv" component={InteractiveInterpretator}/>
                <Route component={NotFoundScreen} />spacnacs
            </Switch>
        </React.Fragment>
    );
}


function App() {


  return (
      <StoreProvider store={store}>
        <div className="App">
              <Router>
                <InnerApp />
              </Router>
          </div>
      </StoreProvider>
  );
}

export default App;
