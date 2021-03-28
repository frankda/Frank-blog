import React from 'react';
import './App.scss';
import {
  BrowserRouter,
  Route,
} from 'react-router-dom';
import BlogList from './components/BlogList/BlogList';
import BlogUpload from './components/BlogUpload/BlogUpload';

const App: React.FC = () => (
  <div className="container">
    <BrowserRouter>
      <Route exact path="/" component={BlogList} />
      <Route path="/upload" component={BlogUpload} />
    </BrowserRouter>
  </div>
);

export default App;
