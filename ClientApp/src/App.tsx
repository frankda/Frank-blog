import React from 'react';
import './App.scss';
import {
  BrowserRouter,
  Route,
} from 'react-router-dom';
import BlogList from './components/BlogList/BlogList';
import BlogUpload from './components/BlogUpload/BlogUpload';
import Navigation from './components/Navigation/Navigation';

const App: React.FC = () => (
  <div className="app">
    <Navigation />
    <BrowserRouter>
      <Route exact path="/" component={BlogList} />
      <Route path="/upload" component={BlogUpload} />
    </BrowserRouter>
  </div>
);

export default App;
