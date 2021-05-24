import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Header = () => <h2>Header</h2>;
const Dashboard = () => <h2>Dashboard</h2>;
const Landing = () => <h2>Landing</h2>;

const App = () => {
  return (
    <div>
      <Router>
        <div>
          <Route exact path="/" component={Landing} />
          <Route path="/surveys" component={Dashboard} />
        </div>
      </Router>
    </div>
  );
};

export default App;
